import React from 'react'
import {
  Grid,
  Input,
  Flex,
  VStack,
  HStack,
  Button,
  Avatar,
  AvatarBadge,
  Box,
} from '@chakra-ui/react'

import ChatSearch from './ChatSearch'
import Users from './Users'
import ProfileBar from './ProfileBar'

const UsersList = () => {
  return (
    <Grid templateRows="50px 1fr 50px" bgColor="blackAlpha.700" px={3}>
      <ChatSearch />
      <Users />
      <ProfileBar />
    </Grid>
  )
}

export default UsersList
