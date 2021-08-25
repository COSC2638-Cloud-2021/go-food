import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './AppRouter';
import theme from './theme';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <AppRouter />
      </ChakraProvider>
    </HelmetProvider>


  )
}
