import os
import openai

openai.api_key = ("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")

def gpt3(text):
  response = openai.Completion.create(
    engine="text-davinci-001",
    prompt= f"I am a sentence completion botCorrect this to standard English:\n\n '{text}'",
    temperature=0,
    max_tokens=60,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0
  )
  return response.choices[0].text
query = "She no went to the market."
response = gpt3(query)
print(response)
