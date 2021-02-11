import React from 'react'
import { Grid } from '@chakra-ui/react'

import Topbar from './topbar/Topbar'
import Chat from './chat/Chat'

const MainView = () => {
  return (
    <Grid h="100vh" templateRows="50px 1fr" bgColor="discordGrey.100">
      <Topbar />
      <Chat />
    </Grid>
  )
}

export default MainView
