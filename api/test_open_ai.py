import os
import openai

from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
prompt = \
f"""
Correct this to standard English:
###
> She no went to the market.
< She didn't go to the market.
##
> {input("what is a sentence you want to rephrase:")}
<"""
response = openai.Completion.create(
  engine="text-davinci-001",
  prompt=prompt,
  temperature=0,
  max_tokens=60,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)
print(response)