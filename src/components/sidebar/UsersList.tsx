import React from 'react'

import { Grid } from '@chakra-ui/react'

const UsersList = () => {
  return (
    <Grid templateRows="50px 1fr 50px" bgColor="blackAlpha.700" px={3}>
      <span>search</span>
      <span>users</span>
      <span>profile</span>
    </Grid>
  )
}

export default UsersList