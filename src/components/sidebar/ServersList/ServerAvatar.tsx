import React, { useEffect } from 'react'
import { useAtom } from 'jotai'

import { firestore } from '../../../firebase'
import { Avatar } from '@chakra-ui/react'
import { viewType, conversation, serverId } from '../../../hooks/useAppState'
import { RoomProps } from '../../../hooks/react-query/useServers'

const ServerAvatar: React.FC<{ id: string | undefined; name: string; textualRooms: RoomProps[] }> = ({
  id,
  name,
  textualRooms
}) => {
  const [, setType] = useAtom(viewType)
  const [messages, setMessages] = useAtom(conversation)
  const [, setServerId] = useAtom(serverId)
  useEffect(() => {
    const unsubscribe = firestore
      .collection('servers')
      .doc(id)
      .onSnapshot((doc) => {
        console.log(`update : ${JSON.stringify(doc.data(), null, 2)}`)
        const room = doc.data() as RoomProps
        room.messages.forEach((msg, i) => {
          if (i === room.messages.length - 1) {
            console.log('i = length')
            setMessages([...messages, msg])
          }
        })
      })

    return () => unsubscribe()
  }, [])

  return <Avatar cursor="pointer" name={name} onClick={() => {
    setType('SERVER')
    setMessages(textualRooms[0].messages)
    setServerId(id!)
  }} />
}

export default ServerAvatar
