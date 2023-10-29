import { forwardRef, ForwardRefRenderFunction } from 'react'

import ReactInputMask from 'react-input-mask'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputChakra,
} from '@chakra-ui/react'

import { InputProps } from './Input'

interface MaskedInputProps extends InputProps {
  mask: string
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  MaskedInputProps
> = ({ mask, name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputChakra
        name={name}
        id={name}
        as={ReactInputMask}
        mask={mask}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        size="lg"
        _hover={{
          bgColor: 'gray.900',
        }}
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{String(error.message)}</FormErrorMessage>}
    </FormControl>
  )
}

const MaskedInput = forwardRef(InputBase)

export default MaskedInput
