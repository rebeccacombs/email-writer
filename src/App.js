import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import './App.css'
import {
  FormControl,
  Textarea,
  Button,
  FormLabel,
  Text,
  Box,
  useColorModeValue
} from '@chakra-ui/react'


function App() {
const { t, i18n } = useTranslation();
const [tButton, setTButton ] = useState(true)

const [inputText, setInputText] = useState(''); 
const [resultText, setResultText] = useState(''); 
const [isButtonLoading, setIsButtonLoading] = useState(false); 
const [error, setError] = useState(''); 


const handleTranslate = () => {
  setTButton(!tButton)
  tButton ? i18n.changeLanguage('cn') :  i18n.changeLanguage('en');
}

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
    setResultText(data.choices[0].text.trim());
  });
  } catch(error) {
    setError(error)
  }
}
//"You are a chatbot for writing emails. Your main goal is to create a professional email based on a user prompt. \n User prompt: " + inputText + "Email:",

  return (
    <Box p={4}>
      <Box alignItems="center" justifyContent="center" display="flex" flexDirection="row" fontSize="4xl"  mb={4} align="center">
      <Text alignItems="right" fontSize="xl">{t('team-name')}</Text>
        <Text fontWeight='bold' ml='auto'>{t('title')}</Text>
            <Button ml="auto" colorScheme={useColorModeValue('black','white')} _hover={{bg: 'blue.500', color: "white"}} variant="outline" onClick={() => handleTranslate()}>{tButton ? "中文" : "English"}</Button>
            </Box>
            <Text pb={2} fontSize="xl" textAlign='center'>{t('paragraph')}</Text>
            
            {error && (
                <Text color="red.300" my={2} fontSize="xl">{error}</Text>
            )}

        <FormControl isRequired pb={4}>
          <FormLabel fontSize="2xl">{t('input')}</FormLabel>
          <Textarea borderColor={useColorModeValue('black','white')} fontSize="xl" type='text' onChange={(e) => setInputText(e.target.value)} rows={4} placeholder={t('input-placeholder')}>
          </Textarea>
        </FormControl>

          <Button colorScheme={useColorModeValue('black','white')} variant="outline" fontSize="xl" onClick={getOpenAIResponse} isLoading={isButtonLoading} isDisabled={!inputText}>{t('gButton')}</Button>
       
        <FormControl>
        <FormLabel fontSize="2xl" mt={4}>{t('output')}</FormLabel>
            <Textarea borderColor={useColorModeValue('black','white')} fontSize="xl" readOnly type='text' value={resultText} rows={11} placeholder={t('output-placeholder')}>
           </Textarea>
        </FormControl>
    </Box>
)
}



export default App;
