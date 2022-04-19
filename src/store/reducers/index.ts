import { combineReducers } from 'redux'

import login from './login'
import profile from './profiles'
import channel from './channel'
const rootReducer = combineReducers({
  login,
  profile,
  channel,
})

export default rootReducer
