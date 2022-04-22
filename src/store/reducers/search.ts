import produce from "immer"

type SearchStateType = {
  suggestion: string[]
}
const SearchState: SearchStateType = {
  suggestion: [],
}
const search = produce((draft: SearchStateType = SearchState, action: any) => { 
  switch (action.type) {
    case 'search/suggestion':
      draft.suggestion = action.payload
      break
    default:
      break
  }
}, SearchState)

export default search