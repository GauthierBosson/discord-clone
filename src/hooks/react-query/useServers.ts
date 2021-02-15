import firebase from 'firebase'
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from 'react-query'

import { firestore } from '../../firebase'
import { useAuth } from '../useAuth'

// TODO complete schemas for messages in rooms and members
interface ServerProps {
  name: string
  picture: string
  rooms: [
    {
      name: string
      type: 'textual' | 'vocal'
      messages: [
        {
          sender: string
          content: string
          dateTime: Date
        }
      ]
    }
  ]
  members: string[]
}

export const useServers = (): UseQueryResult<
  ServerProps[],
  firebase.firestore.FirestoreError
> => {
  const auth = useAuth()
  return useQuery('getServers', async () => {
    return await firestore
      .collection('users')
      .doc(auth.user?.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const serversId: string[] = doc.get('servers')
          if (serversId.length) {
            const servers = serversId.map((server) =>
              firestore.collection('servers').doc(server).get()
            )
            return servers
          } else {
            return []
          }
        } else {
          return 'no such doc'
        }
      })
      .catch((err) => err)
  })
}

export const createServer = (): UseMutationResult<
  firebase.firestore.DocumentReference,
  firebase.firestore.FirestoreError,
  ServerProps
> => {
  return useMutation(
    async (newServer) =>
      await firestore
        .collection('servers')
        .add(newServer)
        .then((docRef) => docRef)
        .catch((err) => err)
  )
}
