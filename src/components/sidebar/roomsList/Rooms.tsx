import React from 'react'
import { useAtom } from 'jotai'
import { VStack, Skeleton } from '@chakra-ui/react'

import { serverId, roomId } from '../../../hooks/useAppState'
import { useRooms } from '../../../hooks/react-query/useServers'

const Rooms = (): JSX.Element => {
  const [id] = useAtom(serverId)
  const [, setRoomId] = useAtom(roomId)
  const { data, isLoading, isError } = useRooms(id)

  // TODO : make visual error
  if (isError) {
    return <></>
  }

  return (
    <VStack px={3}>
      <Skeleton isLoaded={!isLoading}>
        {data?.map((room) => (
          <span onClick={() => setRoomId(room.id)} key={room.id}>{room.name}</span>
        ))}
      </Skeleton>
    </VStack>
  )
}

export default Rooms
