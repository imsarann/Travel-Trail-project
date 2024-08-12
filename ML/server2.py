from fastapi import FastAPI,Query
from fastapi.responses import JSONResponse
from typing import Union , Optional
import json
from pydantic import BaseModel
from Filtering import collabrative_filtering
from processInput import Process



city_recommendator = collabrative_filtering()
process = Process()
app = FastAPI()


class CityDetail(BaseModel):

    cityname : str


@app.post("/recommendations/similar_city")
async def similar_city(citydetail : CityDetail):

    citydetail = citydetail.dict()
    print(citydetail["cityname"])

    similar_cites = city_recommendator.get_similar_cities(citydetail["cityname"])
    similar_cities_values = process.getSimilarCityValues(similar_cites)

    result_json = similar_cities_values.to_json( orient = "records")

    return    JSONResponse(content = result_json) 