import { Button } from '@chakra-ui/react'
import { Children } from 'react'

export const MyButton = ({ children, ...props }: any) => {
  return (
    <Button
      size='lg'
      type='submit'
      colorScheme='teal'
      variant='solid'
      align='center'
      mt='4'
      {...props}
    >
      {children}
    </Button>
  )
}
