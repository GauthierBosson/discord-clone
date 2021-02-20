import React from 'react'
import { useAtom } from 'jotai'
import { VStack, Skeleton, Button } from '@chakra-ui/react'

import { serverId, roomId } from '../../../hooks/useAppState'
import { useRooms, createRoom } from '../../../hooks/react-query/useServers'
import { useAuth } from '../../../hooks/useAuth'

const Rooms = (): JSX.Element => {
  const auth = useAuth()
  const [id] = useAtom(serverId)
  const [, setRoomId] = useAtom(roomId)
  const { data, isLoading, isError } = useRooms(id)
  const { mutate } = createRoom(id)

  // TODO : make visual error
  if (isError) {
    return <></>
  }

  return (
    <VStack w="100%" px={3}>
      <Skeleton w="100%" isLoaded={!isLoading}>
        <VStack w="100%">
          {data?.map((room) => (
            <Button
              w="100%"
              d="flex"
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => setRoomId(room.id)}
              key={room.id}
            >
              {room.name}
            </Button>
          ))}
        </VStack>
      </Skeleton>
      <button
        onClick={() =>
          mutate({ name: 'other server', members: [auth.user!.uid], messages: [] })
        }
        style={{ backgroundColor: 'white' }}
        type="button"
      >
        Add Room
      </button>
    </VStack>
  )
}

export default Rooms
