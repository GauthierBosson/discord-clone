import React from 'react'
import { Flex, Avatar, HStack } from '@chakra-ui/react'

const Message = () => {
  return (
    <HStack my={6} align="flex-start" px={4} _hover={{ backgroundColor: 'black' }}>
      <Avatar name="John Doe" src="broken" />
      <Flex direction="column">
        <Flex>
          <span>Jonh Doe</span>
          <span>Aujourd'hui à 8h00</span>
        </Flex>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, eveniet
          eaque! Velit eveniet deleniti quo quas, voluptate, impedit rem omnis non
          delectus quod excepturi expedita necessitatibus quis illum est laborum?
        </p>
      </Flex>
    </HStack>
  )
}

export default Message
