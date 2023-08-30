import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalProvider } from './Components/GlobalContext';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
})

root.render(
  <ChakraProvider theme={theme}>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </ChakraProvider>
);
