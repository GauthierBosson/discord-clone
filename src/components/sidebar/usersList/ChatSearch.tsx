import React from 'react'
import { Flex, Input } from "@chakra-ui/react";

const ChatSearch = () => {
  return (
    <Flex align="center">
      <Input
        size="xs"
        rounded="sm"
        type="text"
        placeholder="Rechercher/lancer une conversation"
      />
    </Flex>
  )
}

export default ChatSearch
