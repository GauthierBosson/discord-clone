import React from 'react'
import { Grid } from '@chakra-ui/react'
import { useAtom } from 'jotai'

import MessagesView from './messagesView/MessagesView'
import InputMessage from './InputMessage'
import { viewType } from '../../../hooks/useAppState'

const Chat = (): JSX.Element => {
  const [view] = useAtom(viewType)
  return (
    <Grid templateRows="1fr 60px">
      {view !== 'FRIEND' ? (
        <>
          <MessagesView />
          <InputMessage />
        </>
      ) : (
        <span style={{ backgroundColor: 'white' }}>FRIENDS VIEW</span>
      )}
    </Grid>
  )
}

export default Chat
