import React from 'react'
import { Grid } from '@chakra-ui/react'

import Rooms from './Rooms'

const UsersList = (): JSX.Element => {
  return (
    <Grid templateRows="50px 1fr 50px" bgColor="discordGrey.200">
      <span>truc</span>
      <Rooms />
      <span>machin</span>
    </Grid>
  )
}

export default UsersList
