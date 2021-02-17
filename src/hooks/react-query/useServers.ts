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

// TODO : Messages should be a sub-collection, can't use serverTimestamp atm
export type MessageProps = {
  id: string
  sender: string
  content: string
  timestamp: firebase.firestore.Timestamp
}

export type RoomProps = {
  name: string
  messages: MessageProps[]
}
export interface ServerProps {
  id?: string
  name: string
  picture: string | null
  textualRooms: RoomProps[]
  members: string[]
}

/**
 * Get all servers and return them
 */
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

/**
 * Create a new server
 */
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

/**
 * Add a new message in a room on a server
 */
export const addMessage = (
  serverId: string
): UseMutationResult<void, firebase.firestore.FirestoreError, MessageProps> => {
  const queryClient = useQueryClient()
  return useMutation(async (newMsg) => {
    try {
      await firestore
        .collection('servers')
        .doc(serverId)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion(newMsg),
        })
    } catch (err) {
      console.log(err)
    }
  }, { onSuccess: () => {
    queryClient.invalidateQueries('getServers')
  }})
}
