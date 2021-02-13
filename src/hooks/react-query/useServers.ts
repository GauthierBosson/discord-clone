import { useQuery, UseQueryResult } from 'react-query'

import { firestore } from "../../firebase";
import { useAuth } from "../useAuth";

export const useServers = (): UseQueryResult => {
  const auth = useAuth()
  return useQuery('getServers', async () => {
    return await firestore.collection('users').doc(auth.user?.uid).get().then((doc) => {
      if (doc.exists) {
        return doc.data()
      } else {
        return 'no such doc'
      }
    })
  })
}