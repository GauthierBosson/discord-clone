import React, { useState, useEffect } from 'react'
import { Grid } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'

import Sidebar from './components/sidebar/Sidebar'
import MainView from './components/mainView/MainView'
import Signup from './components/Signup'
import { selectUser, userPresence } from './features/user/userSlice'
import { auth } from './firebase'

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(userPresence(user.displayName))
      } else {
        dispatch(userPresence(null))
      }
      setLoading(false)
    })
  }, [])

  if (loading) return <span>Loading</span>

  return (
    <>
      {user.username ? (
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
