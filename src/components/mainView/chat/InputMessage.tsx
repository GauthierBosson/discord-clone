import React from 'react'

import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Flex,
  Box,
} from '@chakra-ui/react'

const InputMessage = () => {
  return (
    <Box>
      <Box px={4}>
        <InputGroup transform="translateY(-20%)">
          <InputLeftElement pointerEvents="none" children={<span>aa</span>} />
          <Input placeholder="Envoyer un message" bgColor="black" />
          <InputRightElement
            w="6rem"
            pointerEvents="none"
            children={
              <Flex w="100%" justify="space-between">
                <span>a</span>
                <span>b</span>
                <span>c</span>
              </Flex>
            }
          />
        </InputGroup>
      </Box>
    </Box>
  )
}

export default InputMessage
