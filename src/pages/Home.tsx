import { Flex, Heading } from '@chakra-ui/react'

import { NavLink } from 'react-router-dom'

export const Home = () => {
  return (
    <Flex
      w="100vw"
      h="100vh"
      maxW={1480}
      p="6"
      direction="column"
      align="center"
      justify="center"
    >
      <Heading mb="8">Bem vindo</Heading>
      <NavLink to="/register" title="Register">
        Pagina de Candidatos
      </NavLink>
    </Flex>
  )
}
