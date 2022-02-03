import './App.css'
import {
  chakra,
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Input,
} from '@chakra-ui/react'
import { MyText } from './component/utils'

function App() {
  return (
    <ChakraProvider>
      <chakra.main>
        <Container maxW='2xl'>
          <MyText>Apex Legends 戦績checker</MyText>
          <FormControl>
            <FormLabel>プラットフォームを選択してください．頼む．</FormLabel>
            <RadioGroup defaultValue='psn'>
              <HStack spacing='24px'>
                <Radio value='orogin'>origin</Radio>
                <Radio value='psn'>play station</Radio>
                <Radio value='xbl'>x box</Radio>
              </HStack>
            </RadioGroup>
            <FormLabel htmlFor='id'>IDを入力してください．頼む．</FormLabel>
            <Input id='id' placeholder='id' />
          </FormControl>
        </Container>
      </chakra.main>
    </ChakraProvider>
  )
}

export default App
