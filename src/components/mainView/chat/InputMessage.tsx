import React from 'react'
import firebase from 'firebase/app'
import { v4 as uuid } from 'uuid'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Flex,
  Box,
} from '@chakra-ui/react'

import { addMessage } from '../../../hooks/react-query/useServers'
import { serverId } from '../../../hooks/useAppState'
import { useAtom } from 'jotai'

const InputMessage = (): JSX.Element => {
  const [id] = useAtom(serverId)
  const { mutate } = addMessage(id)
  const handleClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({
        id: uuid(),
        sender: 'ififif',
        content: e.currentTarget.value,
        timestamp: firebase.firestore.Timestamp.now()
      })
    }
  }
  return (
    <Box>
      <Box px={4}>
        <InputGroup transform="translateY(-20%)">
          <InputLeftElement pointerEvents="none" children={<span>aa</span>} />
          <Input onKeyDown={(e) => handleClick(e)} placeholder="Envoyer un message" bgColor="black" />
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
