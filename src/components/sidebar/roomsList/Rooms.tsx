import React from 'react'
import { useAtom } from 'jotai'
import { VStack, Skeleton } from '@chakra-ui/react'

import { serverId } from '../../../hooks/useAppState'
import { useRooms } from '../../../hooks/react-query/useServers'

const Users = (): JSX.Element => {
  const [id] = useAtom(serverId)
  const { data, isLoading, isError } = useRooms(id)

  // TODO : make visual error
  if (isError) {
    return <></>
  }

  return (
    <VStack px={3}>
      <Skeleton isLoaded={!isLoading}>
        {data?.map((room) => (
          <span key={room.id}>{room.name}</span>
        ))}
      </Skeleton>
    </VStack>
  )
}

export default Users
