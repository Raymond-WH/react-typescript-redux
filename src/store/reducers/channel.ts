import { Channel } from "@/types/data"
import { ChannelAction } from "@/types/store"
import produce from "immer"

type ChannelStateType = {
  userChannels: Channel[]
  allChannels: Channel[]
  active: number
}

const ChannelState: ChannelStateType = {
  userChannels: [],
  allChannels: [],
  active: 0
}

const channel = produce((draft, action: ChannelAction) => {
  if (action.type === 'channel/getUserChannel') {
    // console.log('ddddddddddd', draft);
    // console.log('bbbbbbb', action);
    
    draft.userChannels = action.payload
  }
  if (action.type === 'channel/getAllChannel') { 
    draft.allChannels = action.payload
  }
  if (action.type === 'channel/changeActive') { 
    draft.active = action.payload
  }
 }, ChannelState)
export default channel