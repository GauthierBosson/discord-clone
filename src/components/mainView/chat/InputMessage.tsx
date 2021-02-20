import React from 'react'
import firebase from 'firebase/app'
import { useAtom } from 'jotai'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Flex,
  Box,
} from '@chakra-ui/react'

import { addMessage } from '../../../hooks/react-query/useServers'
import { serverId, roomId } from '../../../hooks/useAppState'

const InputMessage = (): JSX.Element => {
  const [sId] = useAtom(serverId)
  const [rId] = useAtom(roomId)
  const { mutate } = addMessage(sId, rId)
  const handleClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({
        sender: 'ififif',
        content: e.currentTarget.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
