import { Article } from "@/types/data"
import { getHistoryStorage } from "@/utils/storage"
import produce from "immer"

type SearchStateType = {
  suggestion: string[]
  // 历史记录
  history: string[]
  // 搜索结果
  result: Article[]
}
const SearchState: SearchStateType = {
  suggestion: [],
  history: getHistoryStorage(),
  result: [],
}
const search = produce((draft: SearchStateType = SearchState, action: any) => { 
  switch (action.type) {
    case 'search/suggestion':
      draft.suggestion = action.payload
      break
    case 'search/history':
      draft.history = action.payload
      break
    case 'search/result':
      draft.result = action.payload
      break
    default:
      break
  }
}, SearchState)

export default search