import { atom } from 'jotai'

import { MessageProps } from "./react-query/useServers";

export type ViewTypeProps = 'FRIEND' | 'CHAT' | 'SERVER'

/**
 * Discord has many types of views depending on if you click on server, friend button or one of your friend
 * This state is used has more performant context (using jotai) and passed to all components that could change
 */
export const viewType = atom<ViewTypeProps>('FRIEND')

/**
 * Server are first retrieved in the ServersList components, because they are always displayed and never unmounted,
 * it will be simpler for notifications later on. To avoid multiple queries to retrieve data from firebase, jotai will take
 * the data retrieved with react-query and pass it to the chat view
 */
export const conversation = atom<MessageProps[]>([])

/**
 * Id of the server, used for adding message to a conversation
 * Might be a better way
 */
export const serverId = atom<string>('')

/**
 * Room's id
 */
export const roomId = atom<string>('')

/**
 * Boolean controlling if query messages is enabled
 */
export const isEnabled = atom<boolean>(false)