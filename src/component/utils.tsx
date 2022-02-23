import { Box, Flex, Spacer, Text, TextProps, Image } from '@chakra-ui/react'

export const MyText = (props: TextProps) => {
  return <Text fontSize='4xl' {...props} />
}

export const UserCard = ({ user }: any) => {
  return (
    <Flex
      mx='32'
      mt='4'
      px='8'
      bgColor='rgba(255,255,255,0.8)'
      w='400px'
      h={['32', '40']}
      borderRadius='3xl'
      border='1px'
      borderColor='gray.200'
      boxShadow='xl'
    >
      <Box pt='10' px='4'>
        <Text fontSize={['sm', 'md']} align='center'>
          Your ID
        </Text>
        <Text
          fontSize={['lg', '2xl']}
          fontWeight='bold'
          align='center'
          borderBottom='solid 2px black'
        >
          {user.platformInfo.platformUserId}
        </Text>
      </Box>
      <Spacer />

      <Box w={['24', '32']} h={['24', '32']} p='2' my='auto'>
        <Image src={user.platformInfo.avatarUrl} />
      </Box>
    </Flex>
  )
}
