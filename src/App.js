import React, { useState } from 'react'
import {
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Input,
  Button,
  Stat,
  StatGroup,
  StatNumber,
  StatHelpText,
  StatLabel,
  StatArrow,
  Box,
  Text,
  Flex,
  Spacer,
  Image,
  chakra,
  Center,
} from '@chakra-ui/react'
import { MyText } from './component/utils'
import axios from 'axios'

function App() {
  const [formValues, setFormValues] = useState({
    platform: '',
    id: '',
  })

  const [user, setUser] = useState()
  const statItems = [
    { label: 'level', name: 'Level' },
    { label: 'kills', name: 'キル数' },
    { label: 'damage', name: '累計ダメージ' },
    { label: 'killsPerMatch', name: 'kill / match' },
    { label: 'damagePerMatch', name: 'ダメージ / match' },
    { label: 'finishers', name: '累計フィニッシャー数' },
    { label: 'killsAsKillLeader', name: 'キルリーダーとしてのキル数' },
    { label: 'headshots', name: '累計ヘッドショット数' },
    { label: 'shotgunKills', name: 'ショットガンキル数' },
    { label: 'arKills', name: 'アサルトライフルキル数' },
    { label: 'lmgKills', name: 'LMGキル数' },
  ]
  const rankStatItems = [
    { label: 'rankScore', name: 'バトロワランク' },
    { label: 'arenaRankScore', name: 'アリーナランク' },
  ]
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(name, value) {
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const overview = user?.segments.find((v) => v.type === 'overview').stats

  return (
    <ChakraProvider>
      <chakra.main bgColor='white' minH='100vh' fontFamily='sans-serif'>
        <Container maxW='3xl'>
          <MyText textAlign='center' mt='4'>
            Apex Legends 戦績checker
          </MyText>
          <FormControl mt='4'>
            <FormLabel>プラットフォームを選択してください．</FormLabel>
            <RadioGroup
              defaultValue='psn'
              value={formValues.platform}
              onChange={(value) => handleChange('platform', value)}
            >
              <HStack spacing='24px'>
                <Radio value='origin'>origin</Radio>
                <Radio value='psn'>play station</Radio>
                <Radio value='xbl'>x box</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl mt='4'>
            <FormLabel htmlFor='id'>IDを入力してください．</FormLabel>
            <Input
              id='id'
              value={formValues.id}
              placeholder='id'
              onChange={(e) => handleChange('id', e.target.value)}
            />
          </FormControl>
          <Center>
            <Button
              size='lg'
              type='submit'
              colorScheme='teal'
              variant='solid'
              isLoading={isLoading}
              textAlign='center'
              mt='4'
              onClick={async (e) => {
                setIsLoading(true)
                await axios(
                  `/v2/apex/standard/profile/${formValues.platform}/${formValues.id}?TRN-Api-Key=b8782847-ade0-4502-9baf-bc700bcc9520`
                )
                  .then(({ data }) => setUser(data.data))
                  .catch((error) => console.log(error))
                setIsLoading(false)
              }}
            >
              戦績を確認する😘
            </Button>
          </Center>
          {user && (
            <>
              <Center>
                <Flex
                  mx='32'
                  mt='4'
                  px='8'
                  bgColor='White'
                  w='400px'
                  h='40'
                  border='1px'
                  borderRadius='3xl'
                  boxShadow='xl'
                >
                  <Box pt='10' px='4'>
                    <Text fontSize='md' textAlign='center'>
                      Your ID
                    </Text>
                    <Text
                      fontSize='2xl'
                      textAlign='center'
                      borderBottom='solid 2px black'
                    >
                      {user.platformInfo.platformUserId}
                    </Text>
                  </Box>
                  <Spacer />

                  <Box w='32' h='32' p='2' my='auto'>
                    <Image src={user.platformInfo.avatarUrl} />
                  </Box>
                </Flex>
              </Center>
              {formValues.id === 'oNqNu' ? (
                <Text fontSize='3xl' textAlign='center' mt='8'>
                  俺の戦績は国家機密だよ，出直してください😘
                </Text>
              ) : (
                <>
                  <StatGroup mt='4'>
                    {rankStatItems.map(
                      (item) =>
                        overview[item.label] && (
                          <Box p='2'>
                            <Flex
                              bgColor='White'
                              border='1px'
                              boxShadow='xl'
                              p='2'
                            >
                              <Stat pr='1'>
                                <StatLabel fontSize='xl'>{item.name}</StatLabel>
                                <Text>
                                  {overview[item.label].metadata.rankName}
                                </Text>
                                <StatNumber
                                  fontSize='3xl'
                                  borderBottom='solid 2px black'
                                >
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
                                <Image
                                  src={overview[item.label].metadata.iconUrl}
                                />
                              </Center>
                            </Flex>
                          </Box>
                        )
                    )}
                  </StatGroup>
                  <StatGroup
                    display='grid'
                    gridTemplateColumns='repeat(2, 1fr)'
                    mt='10'
                  >
                    {statItems.map(
                      (item) =>
                        overview[item.label] && (
                          <Stat pl='20' pr='5' bgColor='whiteAlpha.900' mb='4'>
                            <StatLabel fontSize='xl'>{item.name}</StatLabel>
                            <StatNumber fontSize='3xl'>
                              {overview[item.label].value}
                            </StatNumber>
                            <StatHelpText>
                              <StatArrow type='increase' />
                              {overview[item.label].rank
                                ? `${overview[item.label].rank}位`
                                : 'ランキング圏外'}
                            </StatHelpText>
                          </Stat>
                        )
                    )}
                  </StatGroup>
                </>
              )}
            </>
          )}
        </Container>
      </chakra.main>
    </ChakraProvider>
  )
}

export default App
