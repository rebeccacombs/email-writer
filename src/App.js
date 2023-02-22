import React, {useState} from 'react';

import {
  FormControl,
  Textarea,
  Button,
  FormLabel,
  Text,
  Box
} from '@chakra-ui/react'

import './App.css'

function App() {
const [inputText, setInputText] = useState(''); 
const [resultText, setResultText] = useState(''); 
const [isButtonLoading, setIsButtonLoading] = useState(false); 
const [error, setError] = useState(''); 

async function getOpenAIResponse() {
  setIsButtonLoading(true); 

  // For 0-10
  // What is the sentiment of this tweet with a value between 0 and 10 (10 being its very positive)? 
  
  if(inputText.split(" ").length < 5){
    setError("Please enter more text.")
    setIsButtonLoading(false); 
    return
  }
  const APIBody = {
    "model": "text-davinci-003",
    "prompt": "You are a chatbot for writing emails. Your main goal is to create a professional email based on a user prompt. \n User prompt: " + inputText + "Email:",
    "temperature": 0,
    "max_tokens": 256,
  }

  const api_key = process.env.REACT_APP_MY_PERSONAL_API_KEY;
  
  try{
    await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + api_key
    },
    body: JSON.stringify(APIBody)
  }, setIsButtonLoading(true) ).then((data) => {
    return data.json();
  }).then((data) => {
    setIsButtonLoading(false);
    console.log(data.choices[0].text);
    setResultText(data.choices[0].text.trim());
  });
  } catch(error) {
    setError(error)
  }
  
}

//"You are a chatbot for writing emails. Your main goal is to create a professional email based on a user prompt. \n User prompt: " + inputText + "Email:",
  return (
    <Box p={4}>
      <Text fontSize="4xl" fontWeight='bold' mb={4} align="center">
      Email Generator
            </Text>
            <Text pb={2} fontSize="xl" textAlign='center'>This is tool used for generating emails. Enter some text on what you want the email to be about. Specify who it is going to as well.</Text>
            
            {error && (
                <Text color="red.300" my={2} fontSize="xl">{error}</Text>
            )}

        <FormControl isRequired pb={4}>
          <FormLabel fontSize="2xl">Input</FormLabel>
          <Textarea fontSize="xl" type='text' onChange={(e) => setInputText(e.target.value)} rows={4} placeholder="Write main points of what you want the email to be about.">
          </Textarea>
        </FormControl>

          <Button fontSize="xl" onClick={getOpenAIResponse} isLoading={isButtonLoading} isDisabled={!inputText}>Generate email</Button>
       
        <FormControl>
        <FormLabel fontSize="2xl" mt={4}>Output</FormLabel>
            <Textarea fontSize="xl" readOnly type='text' value={resultText} rows={11} placeholder="Output text displays here.">
           </Textarea>
        </FormControl>
    </Box>
)
}



export default App;
