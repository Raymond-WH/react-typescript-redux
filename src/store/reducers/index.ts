import { combineReducers } from 'redux'

import login from './login'
import profile from './profiles'
import channel from './channel'
import home from './home'
const rootReducer = combineReducers({
  login,
  profile,
  channel,
  home,
})

export default rootReducer
