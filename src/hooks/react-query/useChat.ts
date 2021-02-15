import firebase from 'firebase'
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from 'react-query'

import { firestore } from '../../firebase'
import { useAuth } from '../useAuth'

interface ChatProps {
  participants: [string, string]
  messages: [
    {
      sender: string
      content: string
      dateTime: Date
    }
  ]
}

export const useChats = (): UseQueryResult<
  ChatProps[],
  firebase.firestore.FirestoreError
> => {
  const auth = useAuth()
  return useQuery('getChats', async () => {
    return await firestore
      .collection('users')
      .doc(auth.user?.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const chatsId: string[] = doc.get('chats')
          if (chatsId.length) {
            const chats = chatsId.map((chat) =>
              firestore.collection('chats').doc(chat).get()
            )

            return chats
          } else {
            return []
          }
        }
      })
  })
}

export const createServer = (): UseMutationResult<
  firebase.firestore.DocumentReference,
  firebase.firestore.FirestoreError,
  ChatProps
> => {
  return useMutation(
    async (newChat) =>
      await firestore
        .collection('chats')
        .add(newChat)
        .then((docRef) => docRef)
        .catch((err) => err)
  )
}
