import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AppView from './containers/AppView'
import Login from './containers/Login'
import Signup from './containers/Signup'
import { PrivateRoute, ProvideAuth } from './hooks/useAuth'

function App(): JSX.Element {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <PrivateRoute path='/'>
            <AppView />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
    // <>
    //   {hasUser ? (
    //     <Grid templateColumns="300px 1fr">
    //       <Sidebar />
    //       <MainView />
    //     </Grid>
    //   ) : (
    //     <Signup />
    //   )}
    // </>
  )
}

export default App
