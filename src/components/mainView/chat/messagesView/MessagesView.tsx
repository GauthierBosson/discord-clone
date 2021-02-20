import React, { useEffect, useRef } from 'react'
import { VStack, Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useQueryClient } from 'react-query'

import Message from './Message'
import { firestore } from '../../../../firebase'
import { serverId, roomId, isEnabled } from '../../../../hooks/useAppState'
import { useMessages } from '../../../../hooks/react-query/useServers'

const MessagesView = (): JSX.Element => {
  const queryClient = useQueryClient()
  const [sId] = useAtom(serverId)
  const [rId] = useAtom(roomId)
  const [enableMessages, setEnableMessages] = useAtom(isEnabled)
  const isFirstRender = useRef(true)
  let unsubscribe: () => any = () => {}
  const { data, isLoading, isError } = useMessages(sId, rId, enableMessages)

  useEffect(() => {
    if (!isFirstRender.current && rId !== '') {
      unsubscribe = firestore
        .collection('servers')
        .doc(sId)
        .collection('rooms')
        .doc(rId)
        .collection('messages')
        .onSnapshot(() => {
          queryClient.invalidateQueries(['getMessages', rId])
        })
    }

    return () => {
      if (!isFirstRender.current && rId !== '') {
        unsubscribe()
      } else {
        isFirstRender.current = false
        setEnableMessages(true)
      }
    }
  }, [rId])

  if (enableMessages === false) {
    return <span>Loading isEnabled</span>
  }

  return (
    <Box h="100%" pos="relative">
      <VStack
        spacing={0}
        pos="absolute"
        top="0"
        right="0"
        left="0"
        bottom="0"
        overflowY="scroll"
      >
        {isLoading ? (
          <span>Loading data</span>
        ) : (
          <>
            {isError ? (
              <span>Error while retrieving msg</span>
            ) : (
              <>
                <Box flex="1 1 auto"></Box>
                {data?.map((msg) => {
                  return (
                    <Message
                      key={msg.id}
                      sender={msg.sender}
                      content={msg.content}
                      timestamp={msg.timestamp}
                    />
                  )
                })}
              </>
            )}
          </>
        )}
        {/* Fix (temporary ?) flex-end breaks overflow scroll, adding this Box makes first msg goes all way down and enable scroll */}
      </VStack>
    </Box>
  )
}

export default MessagesView
