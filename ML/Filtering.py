import pickle
import pymongo
from sklearn.metrics.pairwise import cosine_similarity


# Recommend similar cities
class getRecommendations:

    def __init__(self) :

        filtering_datas = pickle.load(open("content_filttering.pkl","rb"))
        self.cities = filtering_datas["cities"]
        self.cos_sim = filtering_datas["cossim"]
        self.reverse_indices = filtering_datas["reverse_indices"]

        client = pymongo.MongoClient("mongodb://localhost:27017")
        self.database = client["tourism_recommendation"]
        self.users = self.database["UserDetails"]
        self.overall_cities = []

    def get_similar_cities(self , city_name):

        try:

            indx = self.reverse_indices[city_name]

            similar_cities = list(enumerate(self.cos_sim[indx]))

            similar_cities = sorted(similar_cities ,key = lambda x : x[1], reverse=True)

            similar_cities = similar_cities[1:11]
            
            city_indices =  [i for i,j in similar_cities]

            self.overall_cities += [self.cities[i] for i in city_indices][1:4]

            print(f"similar cities : {[self.cities[i] for i in city_indices][1:4]}")
        
        except:

            return False
    
    def get_cities_from_similar_users(self,cossim, my_ratings , othes_ratings):

        get_similar_users = list(enumerate(cossim[0]))
        get_similar_users = sorted(get_similar_users ,key = lambda x : x[1], reverse=True)

        cities = []
        t = 0
        while (len(cities) < 4 and t < len(get_similar_users)):

            print(get_similar_users[t])
            user_index = get_similar_users[t][0]
            ratings = othes_ratings[user_index]
                
            for i in range(len(my_ratings)):

                if(ratings[i] >= 3.5 and my_ratings[i] == 2.5):
                    if(self.cities[i] not in cities):
                        cities.append(self.cities[i])
            t+=1
        
        print(f"similar_users_cities : {cities}")

        self.overall_cities +=  cities



    
    def getOverAllRecommendation(self , email) :

        self.overall_cities = []
        print("Enter the processsssss..................")
        mySim = self.users.find_one({"email" : email} , {"_id" : 0 , "search_history" : 1 , "cities_rating":1})

        print(mySim)

        if(mySim == None):


            return False # False means the user is newUset so recommend Top hotels in out history
        
        recommended_cities = []

        if(len(mySim["search_history"])>0):
            most_occured_city = mySim["search_history"][-1]
            times = 1

            for city in  set(mySim["search_history"][-1:]):

                count = mySim["search_history"].count(city)

                if(count > times):
                    most_occured_city = city
                    times = count
                    
            self.get_similar_cities(most_occured_city)

        self.getSimilarUsers(email,mySim)
            
        print(f"most occured {most_occured_city} count {count}")

        return set(list(self.overall_cities))

        
            
        

    def getSimilarUsers(self , email , mySim):


        if(len(mySim["search_history"]) < 4 ):
            return False # False means the user is newUser and not searched that much . so we recommend Top hotels in out history
        

        otherSim = self.users.find({ "email" : {"$ne" : email}}, {"_id" : 0 , "search_history" : 1 , "cities_rating":1})

        other_users_cities_rating = []

        for l in otherSim:
            other_users_cities_rating.append(l["cities_rating"])

        cossim = cosine_similarity([mySim["cities_rating"]] ,other_users_cities_rating )

        print(cossim)

        self.get_cities_from_similar_users(cossim , mySim["cities_rating"] , other_users_cities_rating)



    def createUser(self, email , total_cities = 1083):

        UserDetails = {"email" : email , "search_history" : [] , "cities_rating" : [2.5]*total_cities}

        x = self.users.insert_one(UserDetails)

        print(str(x) + f"New user {email} has been created")
        
    
    def addHistory(self , email,name):
        mySim = self.users.find_one({"email" : email} , {"_id" : 0 , "search_history" : 1 ,"cities_rating" : 1 })

        if(mySim == None):
            self.createUser(email)
            self.addHistory(email,name)
            return
        
        sr = mySim["search_history"]

        if(name in self.cities):
            sr = sr + [name]

            x = self.users.update_one({"email" : email} , { "$set" : {"search_history" : sr}})
            print(x)

            cr = mySim["cities_rating"]
            city_index = self.reverse_indices[name]
            cr[city_index] += 1
            
            x = self.users.update_one({"email" : email} , { "$set" : {"cities_rating" : cr}})

            return "Search history updated"
        
        return "City not in the list"
    
    
    def updateRating(self , email , rating , name):

        mySim = self.users.find_one({"email" : email} , {"_id" : 0 , "cities_rating" : 1 })

        if(mySim == None):
            self.createUser(email)
            self.updateRating(email,rating ,name)
            return
        
        cr = mySim["cities_rating"]


        
        print(f"cities_rating {cr}")
        if(name in self.cities):
            i = self.reverse_indices[name]
            cr[i] = rating
            x = self.users.update_one({"email" : email} , { "$set" : {"cities_rating" : cr}})
            print(x)
            return "User's rating updated"
        
        return "City not in the list"
        