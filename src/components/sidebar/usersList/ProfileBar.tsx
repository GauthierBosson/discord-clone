import React from 'react'
import { Flex, Avatar, AvatarBadge, HStack } from '@chakra-ui/react'

const ProfileBar = () => {
  return (
    <Flex justify="space-between" align="center" bgColor="discordGrey.300" px={3}>
      <HStack>
        <Avatar size="sm">
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
        <span>Name</span>
      </HStack>
      <HStack>
        <span>ic</span>
        <span>ic</span>
        <span>ic</span>
      </HStack>
    </Flex>
  )
}

export default ProfileBar
