import os
import openai
import json

from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
#print("THIS IS THE PRINTED OUT VERSION OF THE API KEY: ")
#print(openai.api_key)

def gpt3Rephrase(message):

  prompt = \
  f"""
  I am a sentence rephrasing bot. I will rephrase any sentence you give me.
  The food is very good --> The food is superb.

  What do you do? --> How do you like to spend your day?

  I really don't like that --> I actually oppose that.


  {message} --> """ # above message put {parsed_db}
  response = openai.Completion.create(
    engine="text-davinci-001",
    prompt=prompt,
    temperature=0,
    max_tokens=60,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
  )
  response_dict = response["choices"][0] # was a pain parsing this, save lines 38 and 39
  parsed_response = response_dict.text #this still has newlines in it. 
  parsed_response = parsed_response.replace("\n", "")

  return parsed_response

def gpt3SentenceCompletion(message): #honestly this should be renamed to "commands or misc or something else"

  prompt = \
  f"""
  {message}""" # above message put {parsed_db}
  response = openai.Completion.create(
    engine="text-davinci-001",
    prompt=prompt,
    temperature=0,
    max_tokens=60,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
  )
  response_dict = response["choices"][0] # was a pain parsing this, save lines 38 and 39
  parsed_response = response_dict.text #this still has newlines in it. 
  parsed_response = parsed_response.replace("\n", "")

  return parsed_response
  
def gpt3QA(message):

  qmark = "?"
  message = message.replace("?","")
  print("Checked message: " + message)
  prompt = \
  f"""
  I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".

  Q: What is human life expectancy in the United States?
  A: Human life expectancy in the United States is 78 years.

  Q: Who was president of the United States in 1955?
  A: Dwight D. Eisenhower was president of the United States in 1955.

  Q: Which party did he belong to?
  A: He belonged to the Republican Party.

  Q: What is the square root of banana?
  A: Unknown

  Q: How does a telescope work?
  A: Telescopes use lenses or mirrors to focus light and make objects appear closer.

  Q: Where were the 1992 Olympics held?
  A: The 1992 Olympics were held in Barcelona, Spain.


  Q: {message}?""" # above message put {parsed_db}
  response = openai.Completion.create(
    engine="text-davinci-001",
    prompt=prompt,
    temperature=0,
    max_tokens=60,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
  )
  response_dict = response["choices"][0] # was a pain parsing this, save lines 38 and 39
  parsed_response = response_dict.text #this still has newlines in it. 
  parsed_response = parsed_response.replace("\n", "")

  return parsed_response
print(gpt3Rephrase("That was well done"))
print(gpt3SentenceCompletion("Gone. Reduced to "))
print(gpt3QA("Who was the first president of the US"))