import { Article } from "@/types/data"
import { HomeAction } from "@/types/store"
import produce from "immer"

type HomeStateType = {
  articles: {
    [key: number]: {
      timestamp: number
      results: Article[]
    }
  }
}

const HomeState: HomeStateType = {
  articles: {},
}

const home = produce((draft, action: HomeAction) => { 
  switch (action.type) {
    case 'home/getArticleList':
      draft.articles[action.payload.channel_id] = action.payload
      break
    default:
      break
  }
}, HomeState)

export default home