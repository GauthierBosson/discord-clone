import React from 'react'
import { Grid } from '@chakra-ui/react'

import ServersList from './ServersList'
import UsersList from './UsersList'

const Sidebar = () => {
  return (
    <Grid h="100vh" templateColumns="100px 1fr">
      <ServersList />
      <UsersList />
    </Grid>
  )
}

export default Sidebar
