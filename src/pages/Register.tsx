import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Divider,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react'

import Input from '../components/Form/Input'
import MaskedInput from '../components/Form/MaskedInput'

const RegisterFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  cpf: z
    .string()
    .min(14, { message: 'O CPF deve ter 11 digitos' })
    .max(14, { message: 'O CPF deve ter 11 digitos' }),
  phone: z
    .string()
    .min(15, { message: 'Numero invalido' })
    .max(15, { message: 'Numero invalido' }),
  position: z.string().min(3),
})

type RegisterFormData = z.infer<typeof RegisterFormSchema>

interface Candidate {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  position: string
  created_at: Date
}

export const Register = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([])

  const { register, handleSubmit, formState, reset } =
    useForm<RegisterFormData>({
      resolver: zodResolver(RegisterFormSchema),
      defaultValues: {
        cpf: '',
        phone: '',
      },
    })

  function handleRegisterCandidate(data: RegisterFormData) {
    const newCandidate = {
      id: String(new Date().getTime()),
      ...data,
      created_at: new Date(),
    }

    setCandidates((prev) => [...prev, newCandidate])
    reset({ cpf: '', name: '', email: '', phone: '', position: '' })
    console.log(candidates)
  }

  const isSubmitDisabled = !formState.isValid
  const isLoading = formState.isSubmitting

  return (
    <Box w="100vw" h="100vh" maxW={1480} p="6">
      <Box
        flex="1"
        borderRadius={8}
        bg="gray.800"
        p="8"
        mb="6"
        as="form"
        onSubmit={handleSubmit(handleRegisterCandidate)}
      >
        <Heading size="lg" fontWeight="normal">
          Cadastrar candidato
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
            <Input
              label="Nome"
              type="text"
              {...register('name')}
              error={formState.errors.name}
            />
            <Input
              type="email"
              label="E-mail"
              error={formState.errors.email}
              {...register('email')}
            />
            <MaskedInput
              label="CPF"
              mask="999.999.999-99"
              error={formState.errors.cpf}
              {...register('cpf')}
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
            <MaskedInput
              label="Telefone"
              mask="(99) 99999-9999"
              {...register('phone')}
              error={formState.errors.phone}
            />
            <Input
              label="Cargo"
              error={formState.errors.position}
              {...register('position')}
            />
            <Button
              colorScheme="pink"
              type="submit"
              h="12"
              mt="auto"
              disabled={isSubmitDisabled}
              isLoading={isLoading}
            >
              Cadastrar
            </Button>
          </SimpleGrid>
        </VStack>
      </Box>

      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Heading size="lg" fontWeight="normal" mb="8">
          Candidatos
        </Heading>
        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>Candidato</Th>
              <Th textAlign="center">CPF</Th>
              <Th textAlign="center">Telefone</Th>
              <Th textAlign="center">Cargo</Th>
              <Th textAlign="end">Data de cadastro</Th>
            </Tr>
          </Thead>
          <Tbody>
            {candidates.map((candidate) => {
              return (
                <Tr key={candidate.id}>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">{candidate.name}</Text>
                      <Text fontSize="sm" color="gray.300">
                        {candidate.email}
                      </Text>
                    </Box>
                  </Td>
                  <Td textAlign="center">{candidate.cpf}</Td>
                  <Td textAlign="center">{candidate.phone}</Td>
                  <Td textAlign="center">{candidate.position}</Td>
                  <Td textAlign="end">{candidate.created_at.toDateString()}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
