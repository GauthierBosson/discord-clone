import React from 'react'
import { Grid } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import Sidebar from './components/sidebar/Sidebar'
import MainView from './components/mainView/MainView'
import Signup from './components/Signup'
import { selectUser } from './features/user/userSlice'

function App(): JSX.Element {
  const user = useSelector(selectUser)

  return (
    <>
      {user.userInfos ? (
        <Grid templateColumns="300px 1fr">
          <Sidebar />
          <MainView />
        </Grid>
      ) : (
        <Signup />
      )}
    </>
  )
}

export default App
