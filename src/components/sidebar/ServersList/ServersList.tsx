import React from 'react'
import { VStack, SkeletonCircle } from '@chakra-ui/react'

import { useServers, createServer } from '../../../hooks/react-query/useServers'
import ServerAvatar from './ServerAvatar'

const ServersList = (): JSX.Element => {
  const { data, isLoading, isError } = useServers()
  const { mutate } = createServer()
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
                <ServerAvatar
                  key={d.id}
                  name={d.name}
                  id={d.id}
                  textualRooms={d.textualRooms}
                />
              ))}
            </>
          )}
        </>
      )}
      <button
        style={{ backgroundColor: 'white' }}
        onClick={() =>
          mutate({
            name: 'testserver',
            picture: null,
            textualRooms: [{ name: 'accueil', messages: [] }],
            members: [],
          })
        }
      >
        ADD SERVER
      </button>
    </VStack>
  )
}

export default ServersList
