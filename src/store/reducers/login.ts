import { Token } from "@/types/data"
import { LoginAction } from "@/types/store"
import { getToken } from "@/utils/storage";
// 初始的token从localStorage中获取
const initialState:Token = getToken()

const login = (state = initialState, action: LoginAction): Token => {
  if (action.type === 'login/login') { 
    console.log(action.payload);
    
    return action.payload
  }
  if (action.type === 'login/logout') { 
    return {} as Token
  }
  return state
}

export default login
