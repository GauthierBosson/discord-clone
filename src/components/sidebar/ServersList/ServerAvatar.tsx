import React, { useEffect } from 'react'

import { firestore } from '../../../firebase'
import { Avatar } from '@chakra-ui/react'

const ServerAvatar: React.FC<{ id: string | undefined; name: string }> = ({ id, name }) => {
  useEffect(() => {
    const unsubscribe = firestore
      .collection('servers')
      .doc(id)
      .onSnapshot(() => {
        console.log(`server ${id} : new msg`)
      })

    return () => unsubscribe()
  }, [])

  return (
    <>
      <Avatar name={name} />
      {/* <button
        style={{backgroundColor: 'white'}}
        onClick={() => {
          firestore.collection('servers').doc(id).update({
            messages: firebase.firestore.FieldValue.arrayUnion(Math.random())
          })
        }}
      >
        Add message
      </button> */}
    </>
  )
}

export default ServerAvatar
