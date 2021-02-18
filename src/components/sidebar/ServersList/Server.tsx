import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { SkeletonCircle } from '@chakra-ui/react'

import { firestore } from '../../../firebase'
import { Avatar } from '@chakra-ui/react'
import { viewType, serverId } from '../../../hooks/useAppState'
import { useServer } from '../../../hooks/react-query/useServers'

// TODO : Instead of getting all infos in props, get all the infos with getServer query
const Server: React.FC<{ id: string | undefined }> = ({ id }) => {
  const { data, isLoading, isError } = useServer(id!)
  const [, setType] = useAtom(viewType)
  const [, setServerId] = useAtom(serverId)
  useEffect(() => {
    const unsubscribe = firestore
      .collection('servers')
      .doc(id)
      .onSnapshot((doc) => {
        console.log(`update : ${JSON.stringify(doc.data(), null, 2)}`)
        // const room = doc.data() as RoomProps
        // room.messages.forEach((msg, i) => {
        //   if (i === room.messages.length - 1) {
        //     console.log('i = length')
        //     setMessages([...messages, msg])
        //   }
        // })
      })

    return () => unsubscribe()
  }, [])

  if (isError) {
    return null
  }

  return (
    <SkeletonCircle size="12" isLoaded={!isLoading}>
      <Avatar
        name={data?.name}
        picture={data?.picture}
        cursor="pointer"
        onClick={() => {
          setType('SERVER')
          setServerId(id!)
        }}
      />
    </SkeletonCircle>
  )
}

export default Server
