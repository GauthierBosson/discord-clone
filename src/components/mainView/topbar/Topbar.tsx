import React from 'react'

import { Flex, Box, Button, HStack } from '@chakra-ui/react'

const Topbar = () => {
  return (
    <Flex align="center" justify="space-between">
      <Box>
        <HStack>
          <Button size="sm" variant="ghost">Amis</Button>
          <Button size="sm" variant="ghost">En ligne</Button>
          <Button size="sm" variant="ghost">Tous</Button>
          <Button size="sm" variant="ghost">En attente</Button>
          <Button size="sm" variant="ghost">Bloqué</Button>
          <Button size="sm" variant="ghost">Ajouter un ami</Button>
        </HStack>
      </Box>
      <Box>
        <HStack>
          <Button size="sm" variant="ghost">grp</Button>
          <Button size="sm" variant="ghost">rece</Button>
          <Button size="sm" variant="ghost">aide</Button>
        </HStack>
      </Box>
    </Flex>
  )
}

export default Topbar
