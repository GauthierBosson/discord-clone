import React from 'react'
import { VStack, SkeletonCircle } from '@chakra-ui/react'

import { useServers, createServerTest } from '../../../hooks/react-query/useServers'
import Server from './Server'

// TODO : Change the purpose of this file. Pass ONLY the ID to the server components
const ServersList = (): JSX.Element => {
  const { data, isLoading, isError } = useServers()
  const { mutate } = createServerTest()
  return (
    <VStack overflowY="scroll" py={4} bgColor="discordGrey.400">
      {isLoading ? (
        <>
          <SkeletonCircle size="12" />
        </>
      ) : (
        <>
          {isError ? (
            <span>ERROR</span>
          ) : (
            <>
              {data?.map((id) => (
                <Server
                  key={id}
                  id={id}
                />
              ))}
            </>
          )}
        </>
      )}
      <button
        style={{ backgroundColor: 'white' }}
        onClick={() =>
          mutate({ name: 'serverTest', picture: null })
        }
      >
        ADD SERVER
      </button>
    </VStack>
  )
}

export default ServersList
