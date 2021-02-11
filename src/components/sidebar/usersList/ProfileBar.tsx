import React from 'react'
import { Flex, Avatar, AvatarBadge, HStack } from '@chakra-ui/react'

const ProfileBar = () => {
  return (
    <Flex justify="space-between" align="center">
      <Avatar size="sm">
        <AvatarBadge boxSize="1em" bg="green.500" />
      </Avatar>
      <HStack>
        <span>ic</span>
        <span>ic</span>
        <span>ic</span>
      </HStack>
    </Flex>
  )
}

export default ProfileBar
