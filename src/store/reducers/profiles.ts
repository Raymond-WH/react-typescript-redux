import { User } from "@/types/data"
import { ProfileAction } from "@/types/store"
import produce from "immer"
type ProfileStateType = {
  user: User
}
const profileState: ProfileStateType = {
  user: {}as User
}

const profile = produce((draft, action: ProfileAction) => { 
  if(action.type === 'profile/getUser') { 
    draft.user = action.payload
  }
}, profileState)

export default profile