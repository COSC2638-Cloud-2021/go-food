import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './AppRouter';
import theme from './theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

// library.add(fab, faCheckSquare, faCoffee)

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
