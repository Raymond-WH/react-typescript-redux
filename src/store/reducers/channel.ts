import { Channel } from "@/types/data"
import { ChannelAction } from "@/types/store"
import produce from "immer"

type ChannelStateType = {
  userChannels:Channel[]
}

const ChannelState: ChannelStateType = {
  userChannels:[]
}

const channel = produce((draft, action: ChannelAction) => {
  if (action.type === 'channel/getUserChannel') {
    // console.log('ddddddddddd', draft);
    // console.log('bbbbbbb', action);
    
    draft.userChannels = action.payload
  }
 }, ChannelState)
export default channel