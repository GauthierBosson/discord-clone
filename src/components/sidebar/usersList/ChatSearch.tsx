import React from 'react'
import { Flex, Input } from "@chakra-ui/react";

const ChatSearch = () => {
  return (
    <Flex align="center" px={3}>
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
