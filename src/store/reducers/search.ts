import { getHistoryStorage } from "@/utils/storage"
import produce from "immer"

type SearchStateType = {
  suggestion: string[]
  history: string[]
}
const SearchState: SearchStateType = {
  suggestion: [],
  history: getHistoryStorage(),
}
const search = produce((draft: SearchStateType = SearchState, action: any) => { 
  switch (action.type) {
    case 'search/suggestion':
      draft.suggestion = action.payload
      break
    case 'search/history':
      draft.history = action.payload
      break
    default:
      break
  }
}, SearchState)

export default search