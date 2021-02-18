import React, { useEffect, useRef } from 'react'
import { useAtom } from 'jotai'
import { SkeletonCircle } from '@chakra-ui/react'

import { firestore } from '../../../firebase'
import { Avatar } from '@chakra-ui/react'
import { viewType, serverId } from '../../../hooks/useAppState'
import { useServer } from '../../../hooks/react-query/useServers'

const Server: React.FC<{ id: string | undefined }> = ({ id }) => {
  const { data, isLoading, isError } = useServer(id!)
  const [, setType] = useAtom(viewType)
  const [, setServerId] = useAtom(serverId)
  const notification = new Audio('/sound/notification.mp3')
  /**
   * isFirstRender is used to avoid notifications on first render of Server components
   * by checking it's value on the onSnapshot
   */
  const isFirstRender = useRef(true)
  useEffect(() => {
    const unsubscribe = firestore
      .collection('servers')
      .doc(id)
      .onSnapshot(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false
        } else {
          // notification.play()
        }
      })

    return () => unsubscribe()
  }, [])

  // TODO : make an "invalid avatar" for bad server component load
  if (isError) {
    return null
  }

  return (
    <SkeletonCircle size="12" isLoaded={!isLoading}>
      <Avatar
        name={data?.name}
        picture={data?.picture}
        cursor="pointer"
        onClick={() => {
          setType('SERVER')
          setServerId(id!)
        }}
      />
    </SkeletonCircle>
  )
}

export default Server
