import { User, UserProfile } from "@/types/data"
import { ProfileAction } from "@/types/store"
import produce from "immer"
type ProfileStateType = {
  user: User,
  userProfile:UserProfile
}
const profileState: ProfileStateType = {
  user: {} as User,
  userProfile: {} as UserProfile
}

const profile = produce((draft, action: ProfileAction) => { 
  if(action.type === 'profile/getUser') { 
    draft.user = action.payload
  }
  if(action.type === 'profile/getUserProfile') { 
    draft.userProfile = action.payload
  }
}, profileState)

export default profile