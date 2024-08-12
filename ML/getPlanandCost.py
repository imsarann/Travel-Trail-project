import google.generativeai as genai
import re
from security import MY_API_KEY



class Generate:

    def __init__(self):
        genai.configure(api_key = MY_API_KEY)
        self.model =  genai.GenerativeModel(model_name = "gemini-1.5-flash")
        self.text = ""
        self.format = """ {
    "Day-1": {
        "1" : "Visit the Statue of Liberty",
        "2" : "Breakfast at a local diner",
        "3" : "Explore Central Park",
        "5" : "Lunch at a food truck",
        "6" : "Visit the Metropolitan Museum of Art",
        "7" : "Dinner at an iconic New York pizzeria",
        "8" : "Return to hotel"
    },
    "Day-2": {
        "1" : "Walk the High Line",
        "2" : "Brunch at a rooftop restaurant",
        "3" : "Take a ferry to Staten Island",
        "5" : "Lunch at Chelsea Market",
        "6" : "Visit the Museum of Modern Art (MoMA)",
        "7" : "Dinner at a fine dining restaurant",
        "8" : "Return to hotel"
    },
    "Day-days_count": {
        "1" : "Walk across the Brooklyn Bridge",
        "2" : "Breakfast at a bagel shop",
        "3" : "Visit the American Museum of Natural History",
        "5" : "Lunch in a neighborhood café",
        "6" : "Stroll through the New York Botanical Garden",
        "7" : "Dinner at a trendy restaurant in the Meatpacking District",
        "8" : "Return to hotel"
        },
    "Cost" : "1500$" ,
    "Estimation" :[ "your content about cost" ]
    }
    """

    def getOutput(self , start , destination  ,modeOfTransport="flight" , numberOfDays=3   ):


        query = f"I want to travel from {start} to {destination} for  {numberOfDays} days_count  give me a me a tour and cost of travel via flight. please be ralistic as much as possibe . if start and end are not seem to be like valid names return invalid generate the content in the format like this format : {self.format} please dont forget to put commas in json arrays"
        self.text = self.model.generate_content(query).text

        try:
            op = self.text.lower()
            st = re.search("\{\s*\"day\s*-*1",op)
            end = re.search("]\s*}",op)
            print(f"sttt = {st}")
            print(f"end = {end}")
            if(st==None or end == None):
                return '{"error" : "Please try again or try with some other city"}'
            st = st.span()[0]
            end = end.span()[1]
            print(op[st:end])
            return op[st:end]
        except:
            return '{"error" : "Please try again or try with some other city"}'



        