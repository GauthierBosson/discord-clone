import React from 'react'
import { Avatar, VStack } from '@chakra-ui/react'

import { useServers } from '../../hooks/react-query/useServers'

const ServersList = (): JSX.Element => {
  const { data } = useServers()
  console.log(data)
  return (
    <VStack overflowY="scroll" py={4} bgColor="discordGrey.400">
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
      <Avatar name="John Doe" src="broken"></Avatar>
    </VStack>
  )
}

export default ServersList
