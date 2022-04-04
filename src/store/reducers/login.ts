import { Token } from "@/types/data"
import { LoginAction } from "@/types/store"

const initialState:Token = {} as Token

const login = (state = initialState, action: LoginAction): Token => {
  if (action.type === 'login/login') { 
    return action.payload
  }
  return state
}

export default login
