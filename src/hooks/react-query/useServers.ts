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

export type MessageProps = {
  id?: string
  sender: string
  content: string
  timestamp: any // firebase.firestore.FieldValue not working :(
}

export type RoomProps = {
  id: string
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

export const useServers = (): UseQueryResult<
  string[],
  firebase.firestore.FirestoreError
> => {
  const auth = useAuth()
  return useQuery('getServers', async () => {
    try {
      const servers: firebase.firestore.DocumentData | undefined[] = []
      const userServers = await firestore
        .collection('users')
        .doc(auth.user?.uid)
        .get()
      if (userServers.exists) {
        const userServersIds: string[] = userServers.get('servers')
        if (userServersIds.length) {
          for (const serverId of userServersIds) {
            const server = await firestore.collection('servers').doc(serverId).get()
            if (server.exists) {
              servers.push(server.id)
            }
          }
        }
      }
      return servers
    } catch (error) {
      return error
    }
  })
}

/**
 * Get one server
 */
export const useServer = (
  serverId: string
): UseQueryResult<ServerProps, firebase.firestore.FirestoreError> => {
  return useQuery(['getServer', serverId], async () => {
    try {
      const server = await firestore.collection('servers').doc(serverId).get()
      if (server.exists) {
        return server.data()
      } else {
        return "Server doesn't exists"
      }
    } catch (err) {
      return err
    }
  })
}

/**
 * Get all rooms for one server
 * @param serverId server's id
 */
export const useRooms = (
  serverId: string
): UseQueryResult<RoomProps[], firebase.firestore.FirestoreError> => {
  return useQuery(['getRooms', serverId], async () => {
    try {
      const rooms = await firestore
        .collection('servers')
        .doc(serverId)
        .collection('rooms')
        .get()
      return rooms.docs.map((room) => ({
        id: room.id,
        name: room.data().name,
        members: room.data().members,
      }))
    } catch (error) {
      return error
    }
  })
}

/**
 * Get one specific room for one server
 * @param serverId server's id
 * @param roomId room's id
 */
export const useRoom = (
  serverId: string,
  roomId: string
): UseQueryResult<RoomProps, firebase.firestore.FirestoreError> => {
  return useQuery(['getRoom', roomId], async () => {
    try {
      const room = await firestore
        .collection('servers')
        .doc(serverId)
        .collection('rooms')
        .doc(roomId)
        .get()
      return room.data()
    } catch (error) {
      return error
    }
  })
}

/**
 * Récupérer tous les messages pour une room
 * @param serverId id du serveur
 * @param roomId id de la room
 * @param isEnabled boolean that decides if the query should run
 */
export const useMessages = (
  serverId: string,
  roomId: string,
  isEnabled: boolean
): UseQueryResult<MessageProps[], firebase.firestore.FirestoreError> => {
  return useQuery(
    ['getMessages', roomId],
    async () => {
      try {
        const messages = await firestore
          .collection('servers')
          .doc(serverId)
          .collection('rooms')
          .doc(roomId)
          .collection('messages')
          .orderBy('timestamp', 'asc')
          .get()
        return messages.docs.map((message) => ({
          id: message.id,
          sender: message.data().sender,
          content: message.data().content,
          timestamp: message.data().timestamp,
        }))
      } catch (error) {
        return
      }
    },
    { enabled: isEnabled }
  )
}

/**
 * Create a new server
 */
export const createServer = (): UseMutationResult<
  void,
  firebase.firestore.FirestoreError,
  { name: string; picture: string | null }
> => {
  const auth = useAuth()
  const queryClient = useQueryClient()
  return useMutation(
    async (newServer) => {
      const { name, picture } = newServer
      try {
        const server = await firestore.collection('servers').add({ name, picture })
        await server
          .collection('rooms')
          .add({ name: 'accueil', members: [auth.user?.uid] })
        await firestore
          .collection('users')
          .doc(auth.user?.uid)
          .update({
            servers: firebase.firestore.FieldValue.arrayUnion(server.id),
          })
      } catch (error) {
        return error
      }
    },
    { onSuccess: () => queryClient.invalidateQueries('getServers') }
  )
}

/**
 * Add a new message in a room on a server
 */
export const addMessage = (
  serverId: string,
  roomId: string
): UseMutationResult<void, firebase.firestore.FirestoreError, MessageProps> => {
  return useMutation(async (newMsg) => {
    try {
      await firestore
        .collection('servers')
        .doc(serverId)
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add(newMsg)
    } catch (err) {
      console.log(err)
    }
  })
}
