import React from 'react'
import { VStack, Box } from "@chakra-ui/react";

import Message from './Message'

const MessagesView = () => {
  return (
    <Box h="100%" pos="relative">
      <VStack spacing={0} pos="absolute" top="0" right="0" left="0" bottom="0" overflowY="scroll">
        {/* Fix (temporary ?) flex-end breaks overflow scroll, adding this Box makes first msg goes all way down and enable scroll */}
        <Box flex="1 1 auto"></Box>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </VStack>
    </Box>
  )
}

export default MessagesView
