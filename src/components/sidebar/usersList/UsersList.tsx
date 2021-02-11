import React from 'react'
import { Grid } from '@chakra-ui/react'

import ChatSearch from './ChatSearch'
import Users from './Users'
import ProfileBar from './ProfileBar'

const UsersList = (): JSX.Element => {
  return (
    <Grid templateRows="50px 1fr 50px" bgColor="discordGrey.200">
      <ChatSearch />
      <Users />
      <ProfileBar />
    </Grid>
  )
}

export default UsersList
