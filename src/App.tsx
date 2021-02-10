import React from 'react'
import { Grid } from '@chakra-ui/react'

import Sidebar from './components/sidebar/Sidebar'
import MainView from './components/mainView/MainView'

function App() {
  return (
    <Grid templateColumns="300px 1fr">
      <Sidebar />
      <MainView />
    </Grid>
  )
}

export default App
