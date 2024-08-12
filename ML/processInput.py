import pandas as pd 

class Process:

    def __init__(self) :

        self.fromThem = ["BusinessAcceptsCreditCards" , "BikeParking" , "RestaurantsTakeOut","WiFi" ,"GoodForKids" , "RestaurantsAttire" , "RestaurantsGoodForGroups" ,"garage", "street", "lot","valet" ]
        self.buisness = pd.read_csv("processed_hotels.csv")
        self.prioriy = ["State" , "City", "RestaurantsGoodForGroups" , "BikeParking" , "BusinessAcceptsCreditCards" , "WiFi" ,"street", "lot"  , "garage","RestaurantsAttire" , "GoodForKids" ,"valet","RestaurantsTakeOut"]
        self.fromMe = ['business_id' , 'name','State','address', 'postal_code', 'City','categories','stars']
        self.default_State = "Pennsylvania" 
        self.default_City = "Philadelphia"



    def addHotel(self,data,city,state):
         
        temp_data = self.buisness[(self.buisness["State"]==state) & (self.buisness["City"]==city)].sort_values(by = ["stars" , "review_count"],ascending = [False,False]).reset_index(drop=True)[self.fromMe]

        curr_ids = data["business_id"].values
        i=0
        while(len(data)<5 and i<len(temp_data)):
             
            id = temp_data.loc[i,["business_id"]].values[0]

            if id not in curr_ids:
                data = data._append(temp_data.iloc[i].to_frame().T)
            i+=1
        return data
            
    def filtKeys(self,data_dict):

        if(data_dict.get("State")==None):
            data_dict["State"] = self.default_State
            data_dict["City"] = self.default_City


        if(data_dict.get("City")==None):
            data_dict["City"] = self.buisness[self.buisness["State"] == data_dict["State"]]["City"].value_counts().index[0]
        
        new_dict = {}

        for p in self.prioriy:

            v  = data_dict.get(p)
            if( v!=None or v!=False):
                new_dict[p] = v

        return new_dict
    


    def getresult(self ,data_dict):

        data_dict = self.filtKeys(data_dict)

        city = data_dict["City"]
        state =  data_dict["State"]
        print(state)


        data = self.buisness[ (self.buisness["State"]==data_dict["State"]) & (self.buisness["City"]==data_dict["City"]) ]
        del data_dict["State"]
        del data_dict["City"]

        for key in data_dict.keys():
            if len(data[data[key]==data_dict[key]]) <= 3:
                continue
            data = data[data[key]==data_dict[key]]
        
        data = data.sort_values(by = ["stars" , "review_count"],ascending = [False,False])[self.fromMe]

        if(len(data)<5):
            data = self.addHotel(data,city,state)
        
        elif(len(data)>5):
            data = data.iloc[:5]
        

            
        return data
    
    def topRatedHotels(self , total_hotels = 21):

        return self.buisness.sort_values(["stars","review_count"] , ascending=[False,False]).groupby("City").head(3).reset_index(drop=True).loc[:total_hotels][self.fromMe]

    def getSimilarCityValues(self , similar_cities , num_hotels_per_cities = 3):
        

        return_cities = self.buisness[self.buisness["City"].isin(similar_cities)].sort_values(["stars"],ascending=False).groupby("City").head( num_hotels_per_cities).reset_index(drop=True)[self.fromMe]


        return return_cities.loc[:12]
        
