import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './AppRouter';
import theme from './theme';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';

export default function App() {
  const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)
  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <AppRouter />
      </ChakraProvider>
    </HelmetProvider>
  )
}
