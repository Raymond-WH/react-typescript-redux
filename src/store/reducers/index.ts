import { combineReducers } from 'redux'

import login from './login'
import profile from './profiles'
import channel from './channel'
import home from './home'
import search from './search'
const rootReducer = combineReducers({
  login,
  profile,
  channel,
  home,
  search
})

export default rootReducer
