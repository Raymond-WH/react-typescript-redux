import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducers'

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
// console.log(composeWithDevTools(applyMiddleware(thunk)))
const store = createStore(
  reducer,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk)
)
export default store
