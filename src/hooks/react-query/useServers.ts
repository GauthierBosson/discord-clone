import firebase from 'firebase/app'
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from 'react-query'

import { firestore } from '../../firebase'
import { useAuth } from '../useAuth'

// TODO complete schemas for messages in rooms and members
interface ServerProps {
  id?: string
  name: string
  picture: string | null
  rooms: {
    name: string
    type: 'textual' | 'vocal'
    messages: [
      {
        sender: string
        content: string
        dateTime: Date
      }
    ]
  }[]
  members: string[]
}

export const useServers = (): UseQueryResult<
  ServerProps[],
  firebase.firestore.FirestoreError
> => {
  const auth = useAuth()
  return useQuery('getServers', async () => {
    try {
      const servers: firebase.firestore.DocumentData | undefined[] = []
      const doc = await firestore.collection('users').doc(auth.user?.uid).get()
      if (doc.exists) {
        const serversId: string[] = doc.get('servers')
        if (serversId.length) {
          for (const id of serversId) {
            await firestore
              .collection('servers')
              .doc(id)
              .get()
              .then((item) => servers.push(item.data()))
          }
        }
        return servers
      } else {
        return 'no such doc'
      }
    } catch (err) {
      return err
    }
  })
}

export const createServer = (): UseMutationResult<
  firebase.firestore.DocumentReference,
  firebase.firestore.FirestoreError,
  ServerProps
> => {
  const auth = useAuth()
  const queryClient = useQueryClient()
  return useMutation(
    async (newServer) =>
      await firestore
        .collection('servers')
        .add(newServer)
        .then(async (docRef) => {
          await docRef.set(
            {
              id: docRef.id,
            },
            { merge: true }
          )
          await firestore
            .collection('users')
            .doc(auth.user?.uid)
            .update({
              servers: firebase.firestore.FieldValue.arrayUnion(docRef.id),
            })
        })
        .catch((err) => err),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getServers')
      },
    }
  )
}
