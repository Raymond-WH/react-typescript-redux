import { combineReducers } from 'redux'

import login from './login'
import profile from './profiles'
const rootReducer = combineReducers({
  login,
  profile,
})

export default rootReducer
