import { BrowserRouter } from 'react-router-dom'

import { Router } from './pages/Router'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from './styles/theme'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  )
}
