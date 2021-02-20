import React from 'react'
import { Flex, Avatar, HStack } from '@chakra-ui/react'

import { MessageProps } from '../../../../hooks/react-query/useServers'

const Message: React.FC<MessageProps> = ({ sender, content, timestamp }) => {
  return (
    <HStack w="100%" my={6} align="flex-start" px={4} _hover={{ backgroundColor: 'black' }}>
      <Avatar name="John Doe" src="broken" />
      <Flex direction="column">
        <Flex>
          <span>{sender}</span>
          <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </Flex>
        <p>
          {content}
        </p>
      </Flex>
    </HStack>
  )
}

export default Message
