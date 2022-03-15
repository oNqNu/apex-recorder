import {
  Box,
  Center,
  chakra,
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  StatGroup,
  Text,
} from '@chakra-ui/react'
import { BsGithub } from 'react-icons/bs'
import axios from 'axios'
import React, { useState } from 'react'
import { MyButton } from './component/button'
import { MyRankStat, MyStat } from './component/stat'
import { UserCard } from './component/utils'
function App() {
  const [formValues, setFormValues] = useState({
    platform: '',
    id: '',
  })

  const [user, setUser] = useState<any>()
  const [errorMsg, setErrorMsg] = useState('')

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

  const getData = async (e) => {
    setIsLoading(true)
    setErrorMsg('')
    await axios(
      `https://asia-northeast1-spsheet-test-328520.cloudfunctions.net/getApexData?platform=${formValues.platform}&id=${formValues.id}`
    )
      .then(({ data }) => {
        setUser(data)
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
        setUser(null)
        setErrorMsg('正しくプラットフォーム,IDを入力してください.')
      })
    setIsLoading(false)
  }

  const overview = user?.segments.find((v) => v.type === 'overview').stats

  return (
    <ChakraProvider>
      <chakra.main
        bgColor='white'
        minH='100vh'
        fontFamily='sans-serif'
        color='white'
        backgroundImage={`url(${process.env.PUBLIC_URL}/bg1.jpg)`}
        backgroundAttachment='fixed'
        backgroundSize='cover'
        p='0'
      >
        <Box minH='100vh' backgroundColor='rgba(0,0,0,0.4)'>
          <Container maxW='3xl' pt='10'>
            <Container
              maxW='3xl'
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Heading align='center' fontSize={['2xl', '5xl']}>
                Apex Legends 戦績checker
              </Heading>
              <IconButton
                as='a'
                colorScheme='white'
                aria-label='hithub'
                icon={<BsGithub size='60px' />}
                size='40px'
                href='https://github.com/oNqNu/apex-recorder'
                target='_blank'
              />
            </Container>
            <Box>
              <FormControl mt='10'>
                <FormLabel fontSize={['lg', '2xl']}>
                  プラットフォームを選択してください．
                </FormLabel>
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
                <FormLabel htmlFor='id' fontSize={['lg', '2xl']}>
                  IDを入力してください．
                </FormLabel>
                <Input
                  id='id'
                  value={formValues.id}
                  placeholder='id'
                  onChange={(e) => handleChange('id', e.target.value)}
                  bgColor='rgba(255,255,255,0.2)'
                />
              </FormControl>
            </Box>
            <Center>
              <MyButton isLoading={isLoading} onClick={getData}>
                戦績を確認する
              </MyButton>
            </Center>
            <Text mt='4' align='center' color='red.500'>
              {errorMsg}
            </Text>

            {user && (
              <>
                <Center color='black'>
                  <UserCard user={user} />
                </Center>
                {user.platformInfo.platformUserId.toUpperCase() === 'ONQNU' ? (
                  <Text
                    fontSize={['xl', '3xl']}
                    align='center'
                    mt='8'
                    color='white'
                  >
                    俺の戦績は国家機密だよ，出直してください😘
                  </Text>
                ) : (
                  <>
                    <StatGroup mt='4' display='flex' color='black'>
                      {rankStatItems.map(
                        (item) =>
                          overview[item.label] && (
                            <MyRankStat item={item} overview={overview} />
                          )
                      )}
                    </StatGroup>
                    <StatGroup
                      display='grid'
                      gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
                      mt='10'
                      mx='4'
                      color='black'
                    >
                      {statItems.map(
                        (item) =>
                          overview[item.label] && (
                            <MyStat item={item} overview={overview} />
                          )
                      )}
                    </StatGroup>
                  </>
                )}
              </>
            )}
            <Text
              fontSize={['lg', '2xl']}
              align='right'
              fontWeight='semibold'
              fontStyle='italic'
              mt='8'
            >
              prod by oNqNu
            </Text>
          </Container>
        </Box>
      </chakra.main>
    </ChakraProvider>
  )
}

export default App
