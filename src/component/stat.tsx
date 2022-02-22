import {
  Box,
  Center,
  Flex,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  StatProps,
  Text,
  Image,
} from '@chakra-ui/react'

export type MyStatProps = StatProps & { item: any; overview: any }

export const MyStat = ({ item, overview }: MyStatProps) => {
  return (
    <Stat
      bgColor='rgba(255,255,255,0.8)'
      mb='4'
      textAlign='center'
      w={['64', '62']}
      h={['32', '52']}
      border='1px'
      borderRadius='xl'
      mx='auto'
    >
      <Box m={['4', '8']}>
        <Box h='2' w='10' borderBottom='4px solid ThreeDShadow'></Box>
        <StatLabel
          fontSize={['md', 'lg']}
          fontWeight='bold'
          textAlign='left'
          mt='2'
        >
          {item.name}
        </StatLabel>

        <StatNumber
          fontSize={['2xl', '4xl']}
          fontWeight='bold'
          color='red.500'
          textShadow='2px 2px 2px black'
          mt={['0', '4']}
        >
          {overview[item.label].value}
        </StatNumber>
        <StatHelpText textAlign='right'>
          <StatArrow type='increase' textAlign='right' />
          {overview[item.label].rank
            ? `${overview[item.label].rank}位`
            : '圏外'}
        </StatHelpText>
      </Box>
    </Stat>
  )
}

export const MyRankStat = ({ item, overview }: MyStatProps) => {
  return (
    <Flex
      bgColor='rgba(255,255,255,0.8)'
      border='1px'
      borderColor='gray.200'
      boxShadow='xl'
      borderRadius='xl'
      p='4'
      m='2'
      maxW='lg'
    >
      <Stat pr='1'>
        <StatLabel fontSize={['md', 'xl']}>{item.name}</StatLabel>
        <Text>{overview[item.label].metadata.rankName}</Text>
        <StatNumber fontSize={['2xl', '3xl']} borderBottom='solid 2px black'>
          {overview[item.label].value}rp
        </StatNumber>
        <StatHelpText>
          <StatArrow type='increase' />
          {overview[item.label].rank
            ? `${overview[item.label].rank}位`
            : 'ランキング圏外'}
        </StatHelpText>
      </Stat>
      <Center>
        <Image src={overview[item.label].metadata.iconUrl} />
      </Center>
    </Flex>
  )
}
