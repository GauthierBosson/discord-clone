import React from 'react'
import { Avatar, VStack, SkeletonCircle } from '@chakra-ui/react'

import { useServers } from '../../hooks/react-query/useServers'

const ServersList = (): JSX.Element => {
  const { data, isLoading, isError } = useServers()
  console.log(data)
  return (
    <VStack overflowY="scroll" py={4} bgColor="discordGrey.400">
      {isLoading ? (
        <>
          <SkeletonCircle size="12" />
          <SkeletonCircle size="12" />
          <SkeletonCircle size="12" />
          <SkeletonCircle size="12" />
        </>
      ) : (
        <>
          {isError ? (
            <span>ERROR</span>
          ) : (
            <>
              {data?.map((d) => (
                <Avatar key={d.name} name="John Doe" src="broken"></Avatar>
              ))}
            </>
          )}
        </>
      )}
    </VStack>
  )
}

export default ServersList
