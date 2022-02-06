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
    { label: 'kills', name: '累計kill数' },
    { label: 'damage', name: '累計ダメージ' },
    { label: 'killsPerMatch', name: 'kill / match' },
    { label: 'damagePerMatch', name: 'ダメージ / match' },
  ]
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(name, value) {
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const overview = user?.segments.find((v) => v.type === 'overview').stats

  return (
    <ChakraProvider>
      <Container maxW='2xl'>
        <MyText textAlign='center'>Apex Legends 戦績checker</MyText>
        <FormControl>
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
        <FormControl>
          <FormLabel htmlFor='id'>IDを入力してください．</FormLabel>
          <Input
            id='id'
            value={formValues.id}
            placeholder='id'
            onChange={(e) => handleChange('id', e.target.value)}
          />
        </FormControl>
        <Button
          w='3xs'
          type='submit'
          colorScheme='teal'
          variant='solid'
          isLoading={isLoading}
          textAlign='center'
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
        {user && (
          <StatGroup display='grid' gridTemplateColumns='repeat(2, 1fr)'>
            {statItems.map((item) => (
              <Stat pl='20'>
                <StatLabel fontSize='xl'>{item.name}</StatLabel>
                <StatNumber fontSize='2xl'>
                  {overview[item.label].value}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type='increase' />
                  {overview[item.label].rank
                    ? `${overview[item.label].rank}位`
                    : 'ランキング圏外'}
                </StatHelpText>
              </Stat>
            ))}
          </StatGroup>
        )}
      </Container>
    </ChakraProvider>
  )
}

export default App
