from fastapi import FastAPI,Query
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Union , Optional
import uvicorn
import json
import pandas as pd
from processInput import Process
from getPlanandCost import Generate
from chatbot import questionChatBot
from Filtering import getRecommendations




app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)




city_recommendator = getRecommendations()

process = Process()
generate = Generate()
questionchatbot = questionChatBot()

fromThem = ["BusinessAcceptsCreditCards" , "BikeParking" , "RestaurantsTakeOut","WiFi" ,"GoodForKids" , "RestaurantsAttire" , "RestaurantsGoodForGroups" ,"garage", "street", "lot","valet" ]
    



class Inputs(BaseModel):
    userid : str
    State : str
    City : Optional[str] = None
    BusinessAcceptsCreditCards : Optional[bool]=None
    BikeParking : Optional[bool]=None
    RestaurantsTakeOut : Optional[bool]=None
    WiFi : Optional[bool]=None
    GoodForKids : Optional[bool]=None
    RestaurantsAttire : Optional[bool]=None
    RestaurantsGoodForGroups : Optional[bool]=None
    garage : Optional[bool]=None
    street : Optional[bool]=None
    lot : Optional[bool]=None
    valet : Optional[bool]=None
    BikeParking : Optional[bool]=None



@app.post("/recommend")
async def recommend(inputs : Inputs):

    inputs = inputs.dict()
    for i in fromThem:
        print(inputs[i])
    

    result  = process.getresult(inputs)

    city_recommendator.addHistory(inputs["userid"] , inputs.get("City",""))

    result_json = result.to_json(orient='records')
    
    # Send the JSON response
    return JSONResponse(content=result_json)



class CostInputs(BaseModel):
    Start : str
    Destination : str 
    modeOfTransport : str
    num_days : int




@app.post("/costAndPlan")
async def costAndPlan(inputs : CostInputs):

    inputs = inputs.dict()
    print(inputs)
    output = generate.getOutput(inputs["Start"] , inputs["Destination"]     , inputs["modeOfTransport"] , inputs["num_days"])
    op = json.loads(output)
    return JSONResponse(op)

class ChatInputs(BaseModel):
    question : str

@app.post("/chatbot/question")
async def chat(inputs : ChatInputs):

    inputs = inputs.dict()
    print(inputs)
    output = questionchatbot.getResut(  question=inputs["question"])
    print(output)
    return output
    


class CityDetail(BaseModel):

    userid : str


@app.post("/recommendations/similar_city")
async def similar_city(citydetail : CityDetail):

    citydetail = citydetail.dict()

    similar_cites = city_recommendator.getOverAllRecommendation(citydetail["userid"])

    similar_cities_values = []
    if(similar_cites != False):
        similar_cities_values = process.getSimilarCityValues(similar_cites)

    if( len(similar_cities_values) == 0):

        similar_cities_values = process.topRatedHotels()

    elif(len(similar_cities_values) < 12):

        similar_cities_values = similar_cities_values._append(process.topRatedHotels())
        similar_cities_values = similar_cities_values.reset_index(drop = True).loc[:12]


    result_json = similar_cities_values.to_json( orient = "records")

    return    JSONResponse(content = result_json)


# python -m uvicorn server:app --host localhost --reload --port 5000

#if __name__ == "__main__":
#   uvicorn.run(app, host="127.0.0.1", port=8000)
