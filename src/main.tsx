import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as ReduxProvider } from 'react-redux'

import App from './App'
import theme from './theme'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
})

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme} resetCSS>
        <App />
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
