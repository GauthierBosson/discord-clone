import React from 'react'
import { Grid } from '@chakra-ui/react'

import ServersList from './ServersList'
import UsersList from './usersList/UsersList'

const Sidebar = () => {
  return (
    <Grid h="100vh" templateColumns="70px 1fr">
      <ServersList />
      <UsersList />
    </Grid>
  )
}

export default Sidebar
