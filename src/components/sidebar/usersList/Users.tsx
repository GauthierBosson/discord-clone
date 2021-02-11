import React from 'react'
import {
  VStack,
  Button,
  Flex,
  HStack,
  Avatar,
  AvatarBadge,
  Box,
} from '@chakra-ui/react'

const Users = (): JSX.Element => {
  return (
    <VStack px={3}>
      <Button
        w="100%"
        leftIcon={<span>ic</span>}
        d="flex"
        justifyContent="flex-start"
        variant="ghost"
      >
        Amis
      </Button>
      <VStack w="100%">
        <Flex w="100%" justify="space-between" px={2}>
          <span>Messages privés</span>
          <span>+</span>
        </Flex>
        <VStack w="100%">
          <HStack p={2} w="100%" spacing={4} _hover={{ backgroundColor: 'black' }}>
            <Avatar size="sm">
              <AvatarBadge boxSize="1em" bg="green.500" />
            </Avatar>
            <Box as="span">Name</Box>
          </HStack>
          <HStack p={2} w="100%" spacing={4} _hover={{ backgroundColor: 'black' }}>
            <Avatar size="sm">
              <AvatarBadge boxSize="1em" bg="green.500" />
            </Avatar>
            <Box as="span">Name</Box>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default Users
