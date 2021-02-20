import React from 'react'
import { Grid } from '@chakra-ui/react'
import { Provider } from 'jotai'

import Sidebar from '../components/sidebar/Sidebar'
import MainView from '../components/mainView/MainView'
// import { useAuth } from '../hooks/useAuth'
// import { firestore } from '../firebase'

const AppView = (): JSX.Element => {
  //const auth = useAuth()
  return (
    <Grid templateColumns="300px 1fr">
      <Provider>
        <Sidebar />
        <MainView />
      </Provider>
      {/* <button onClick={() => auth.signout()}>SIGNOUT</button>
      <button
        onClick={() =>
          firestore
            .collection('users')
            .doc('eeee')
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log(doc)
              } else {
                console.log('no such doc')
              }
            })
        }
      >
        FIRESTORE
      </button> */}
    </Grid>
  )
}

export default AppView
