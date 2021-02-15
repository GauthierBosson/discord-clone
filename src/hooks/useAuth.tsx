import React, { useState, useEffect, useContext, createContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import firebase from 'firebase'

import { auth, firestore } from '../firebase'

interface AuthProvider {
  user: firebase.User | null
  signin: (email: string, password: string) => Promise<firebase.User | null>
  signup: (
    email: string,
    password: string,
    username: string
  ) => Promise<firebase.User | null>
  signout: () => Promise<void>
}

const authContext = createContext<AuthProvider>(undefined!)

export const PrivateRoute = ({
  children,
  path,
}: {
  children: JSX.Element
  path: string
}): JSX.Element => {
  const auth = useAuth()
  return (
    <Route
      path={path}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export function ProvideAuth({
  children,
}: {
  children: JSX.Element
}): JSX.Element | null {
  const [loading, setLoading] = useState(true)
  const authProvider = useProvideAuth(setLoading)
  if (loading) {
    return null
  } else {
    return (
      <authContext.Provider value={authProvider}>{children}</authContext.Provider>
    )
  }
}

export const useAuth = (): AuthProvider => {
  return useContext(authContext)
}

function useProvideAuth(setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
  const [user, setUser] = useState<firebase.User | null>(null)

  const signin = async (email: string, password: string) => {
    const res = await auth.signInWithEmailAndPassword(email, password)
    setUser(res.user)
    return res.user
  }

  const signup = async (email: string, password: string, username: string) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      await res.user?.updateProfile({
        displayName: username,
      })
      await firestore.collection('users').doc(res.user?.uid).set({
        displayName: res.user?.displayName,
        photoURL: res.user?.photoURL,
        friends: [],
        servers: [],
        chats: []
      })
      setUser(res.user)
      return res.user
    } catch (error) {
      return error
    }
  }

  const signout = async () => {
    await auth.signOut()
    setUser(null)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return {
    user,
    signin,
    signup,
    signout,
  } as AuthProvider
}
