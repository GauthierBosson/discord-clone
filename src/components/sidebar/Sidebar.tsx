import React from 'react'
import { Grid } from '@chakra-ui/react'
import { useAtom } from 'jotai'

import ServersList from './serversList/ServersList'
import UsersList from './usersList/UsersList'
import RoomsList from './roomsList/RoomsList'
import { viewType } from '../../hooks/useAppState'

const Sidebar = (): JSX.Element => {
  const [view] = useAtom(viewType)
  return (
    <Grid h="100vh" templateColumns="70px 1fr">
      <ServersList />
      {view !== 'FRIEND' ? <RoomsList /> : <UsersList />}
    </Grid>
  )
}

export default Sidebar
