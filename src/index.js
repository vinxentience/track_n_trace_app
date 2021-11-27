import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

ReactDOM.render(
    <ChakraProvider>
      <ColorModeScript initialColorMode="light"> </ColorModeScript> 
    <App />
    </ChakraProvider>,
  document.getElementById('root')
);