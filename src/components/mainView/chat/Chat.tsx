import React from 'react'
import { Grid } from '@chakra-ui/react'

import MessagesView from './messagesView/MessagesView'
import InputMessage from "./InputMessage";

const Chat = () => {
  return (
    <Grid templateRows="1fr 60px">
      <MessagesView />
      <InputMessage />
    </Grid>
  )
}

export default Chat
