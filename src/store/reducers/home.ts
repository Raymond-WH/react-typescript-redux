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
      // 需要在原来的基础上追加results数据
      const old = draft.articles[action.payload.channel_id]?.results || []
      console.log('old', old);
      
      draft.articles[action.payload.channel_id] = {
        timestamp: action.payload.timestamp,
        results: [...old, ...action.payload.results],
      }
      break
    default:
      break
  }
}, HomeState)

export default home