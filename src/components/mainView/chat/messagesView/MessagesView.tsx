import React from 'react'
import { VStack, Box } from "@chakra-ui/react";
import { useAtom } from "jotai";

import Message from './Message'
import { conversation } from '../../../../hooks/useAppState'

const MessagesView = (): JSX.Element => {
  const [messages] = useAtom(conversation)
  return (
    <Box h="100%" pos="relative">
      <VStack spacing={0} pos="absolute" top="0" right="0" left="0" bottom="0" overflowY="scroll">
        {/* Fix (temporary ?) flex-end breaks overflow scroll, adding this Box makes first msg goes all way down and enable scroll */}
        <Box flex="1 1 auto"></Box>
        {messages.map(msg => (
          <Message key={msg.id} />
        ))}
        <Message />
      </VStack>
    </Box>
  )
}

export default MessagesView
