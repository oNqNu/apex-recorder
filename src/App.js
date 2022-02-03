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
          <FormControl as='fieldset'>
            <FormLabel as='legend'>
              プラットフォームを選択してください．
            </FormLabel>
            <RadioGroup defaultValue='Itachi'>
              <HStack spacing='24px'>
                <Radio value='orogin'>origin</Radio>
                <Radio value='psn'>play station</Radio>
                <Radio value='xbl'>x box</Radio>
              </HStack>
            </RadioGroup>
            <FormLabel htmlFor='first-name'>IDを入力してください．</FormLabel>
            <Input id='id' placeholder='id' />
          </FormControl>
        </Container>
      </chakra.main>
    </ChakraProvider>
  )
}

export default App
