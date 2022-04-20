import os
import openai
import json
import requests

from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def gpt3Rephrase(message, acceptedValues): # these all will need changed parameters to message, AND acceptedMessages which is formatted correctly
  print("Accepted messages: ")
  acceptedMessages = ""
  for i in range(len(acceptedValues)):
    acceptedMessages += acceptedValues[i]['original']
    acceptedMessages += " --> "
    acceptedMessages += acceptedValues[i]['rephrased']
    acceptedMessages += "\n"
  
  
  #print(acceptedValues[0]['rephrased']) # these are rephrased
  #print(acceptedValues[0]['original']) # these are original
  prompt = \
  f"""
  I am a sentence rephrasing bot. I will rephrase any sentence you give me.
  The food is very good. --> The food is superb.

  What do you do? --> How do you like to spend your day?

  I really don't like that --> I actually oppose that.

  {acceptedMessages}
  {message} -->""" # above message put {parsed_db}
  # return prompt # testing prompt correctness.
  response = openai.Completion.create(
    engine="text-davinci-001",
    prompt=prompt,
    temperature=0,
    max_tokens=60,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
  )
  
  #data = requests.get("http://localhost:5000/rephrase-requests")
  #data_json = data.json()

  #print("type of data")
  response_dict = response["choices"][0] # was a pain parsing this, save lines 38 and 39
  parsed_response = response_dict.text.strip() #this still has newlines in it. 
  parsed_response = parsed_response.replace("\n", "")


  return parsed_response

def gpt3SentenceCompletion(message, acceptedValues): #honestly this should be renamed to "commands or misc or something else"
  acceptedMessages = ""
  for i in range(len(acceptedValues)):
    acceptedMessages += acceptedValues[i]['original']
    acceptedMessages += " --> "
    acceptedMessages += acceptedValues[i]['rephrased']
    acceptedMessages += "\n"
  prompt = \
  f"""
  I am a sentence completion bot and will complete any sentence you give me.
  Here are some examples:
  {acceptedMessages}
  {message}""" # above message put {parsed_db} 
  # this could be edited, to be more focused towards completing sentence for essays of a particular topic/question.
  print("Prompt is", prompt)
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
  parsed_response = response_dict.text.strip() #this still has newlines in it. 
  parsed_response = parsed_response.replace("\n", "")

  return parsed_response
  
def gpt3QA(message): 
  """requires a single question."""

  qmark = "?"
  message = message.replace("?","")
  #print("Checked message: " + message)
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

  Q: {message}?
  A:""" # above message put {parsed_db}
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
  parsed_response = response_dict.text.strip() #this still has newlines in it. 
  parsed_response = parsed_response.replace("\n", "")

  return parsed_response

def gpt3StudyTools(message): 

  prompt = \
  f""" I am a bot designed to help a user study by answering the following question: {message}""" # above message put {parsed_db}
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
  parsed_response = response_dict.text.strip() #this still has newlines in it. 
  parsed_response = parsed_response.replace("\n", "")

  return parsed_response

def gpt3SummarizeForSecondGrader(message): 

  prompt = \
  f""" Summarize this for a second grader: {message}""" # above message put {parsed_db}
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
  parsed_response = response_dict.text.strip() #this still has newlines in it. 
  parsed_response = parsed_response.replace("\n", "")

  return parsed_response

def gpt3EssayOutline(text, acceptedValues):
  acceptedMessages = ""
  for i in range(len(acceptedValues)):
    acceptedMessages += acceptedValues[i]['original']
    acceptedMessages += " --> "
    acceptedMessages += acceptedValues[i]['rephrased']
    acceptedMessages += "\n"
  response = openai.Completion.create(
  engine="text-davinci-001",
  prompt=f"I am a highly intelligent bot that creates a formal essay outline:\n\n '{text}' \n {acceptedMessages}", 
  temperature=0,
  max_tokens=64,
  top_p=1.0,
  frequency_penalty=0.0,
  presence_penalty=0.0
	)
  return response.choices[0].text.strip()

def gpt3GrammarCorrection(text):
  response = openai.Completion.create(
  engine="text-davinci-001",
  prompt=f"I am a highly intelligent bot that corrects sentences to standard English:\n\n '{text}'", 
  temperature=0,
  max_tokens=60,
  top_p=1.0,
  frequency_penalty=0.0,
  presence_penalty=0.0
	)
  return response.choices[0].text.strip()


if __name__ == "__main__":
    # put code here
  print(gpt3GrammarCorrection("She no went to the market."))
  print(gpt3EssayOutline("Create an outline for an essay about Walt Disney and his contributions to animation:"))
  print(gpt3SummarizeForSecondGrader("Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history."))
  print(gpt3StudyTools("What are the 5 most important facts about modern history?"))
  print(gpt3Rephrase("That was well done"))
  print(gpt3SentenceCompletion("Gone. Reduced to "))
  print(gpt3QA("Who was the first president of the US"))