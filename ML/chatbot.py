import warnings
warnings.filterwarnings("ignore")
from langchain.text_splitter import RecursiveCharacterTextSplitter
from newspaper import Article
from sentence_transformers import SentenceTransformer
import faiss
import os
import re
import pandas as pd 
import google.generativeai as genai
from security import MY_API_KEY


class questionChatBot:

    def __init__(self , chunk_size=1000):

        genai.configure(api_key = MY_API_KEY)
        self.model = genai.GenerativeModel(model_name = "gemini-1.5-flash")

        self.reviews = pd.read_csv("reviews_only_in_processed_hotels.csv")
        self.encoder = SentenceTransformer("all-mpnet-base-v2")
        self.splitter = RecursiveCharacterTextSplitter(chunk_size =chunk_size , chunk_overlap = 200)
        self.index = faiss.IndexFlatL2()
        self.vectors = []
        self.texts = ""
        self.chunks = []
        self.error = True
        self.url = ""
        #self.default_prompts = [ "Where the place is located. " , "How to book and procedure to book." ,  "what are the special offer and discount" , 
         #                       "How to contact , phone or email address"]

        self.prompt = "Use the following portion of a long document to see if any of the text is proper the question. \nReturn relevent text varbit.\n"

    def getReviews(self, ids):

        result_text = ""
    
        curr_reviews = self.reviews[self.reviews["business_id"].isin(ids)]

        for id in ids:

            result_text += f"Buisness ID : {id} Details,\n"
            cr = curr_reviews[curr_reviews["business_id"] == id]

            if len(cr) == 0:
                result_text += f"\t No reviews available for this id {id}\n\n\n"

            else:
                for i in range(len(cr)):
                    result_text += f"\tReview no {i+1} :\n\t\t" + cr.iloc[i]["text"] + "\n"
                    result_text += f"\tStars : " + str(cr.iloc[i]["stars"]) + "\n"
                    result_text += f"\tAccepted peoples : " + str(cr.iloc[i]["useful"]) + ".\n\n"
                result_text+="\n"
    
        return result_text


    def getTextFromURLS(self,URL):

        self.texts = ""

        try:

            article = Article(URL)
            article.download()
            article.parse()
            self.texts = article.text[:3000]
            
        except:
            return  f"The  Entered URL({URL}) is invalid or permission is not granted."
        
        if(len(self.texts)==0):
            return  f"The  Entered URL({URL}) is invalid or permission is not granted."
          
        self.error = False
        self.url = URL
        self.textToChunks()
        return f"{self.url} URL is scanned successfully...!"
    
    
    def textToChunks(self):

        self.chunks = self.splitter.split_text(self.texts)        
        self.chunksToVectorsAndIndex()
        print(len(self.chunks))
        return len(self.chunks)
    
    def chunksToVectorsAndIndex(self):

        self.vectors = self.encoder.encode(self.chunks)
        self.index = faiss.IndexFlatL2( self.vectors.shape[1])
        self.index.add(self.vectors)
    

    def getResut(self,question):

        if(re.search("http\S*",question)):

            index = re.search("http\S*",question) 
            index = index.span()
            url = question[index[0] : index[1]]
        

            return self.getTextFromURLS(url)
        
        elif( "review:" in question.lower()):

            ids = re.findall("\S{22}",question)
            print(ids)
            return self.getReviews(ids)
        
        return self.getAnswerFromGAI(question)  
        
    
    def getAnswerFromGAI(self , question , k=5):

        if(self.error):
            return "Please Enter valid URL."

        vec = self.encoder.encode([question])
        _ , idx = self.index.search(vec , k = k)

        resopnces = ""

        for i in idx[0]:
            resopnces+= "\n" +( self.model.generate_content( f"{self.prompt + self.chunks[i] }\nquestion: {question}\n Relevent text if any: ").text)
        
        final_output = self.model.generate_content( f" {self.prompt}\n{resopnces}\n question: {question}\n Relevent text if any: ").text + f"\n\n\n[Results are dispalyes from {self.url}]"

        
        return  final_output.replace("*","")
    

if( __name__ == "__main__"):
    cb = questionChatBot()
    cb.getResut("URL:https://en.wikipedia.org/wiki/India")
    print(cb.getResut("When did india got freedom"))
