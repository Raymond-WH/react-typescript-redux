import { ApiResponse, Article } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'
import { setHistoryStorage } from '@/utils/storage'

export const getSuggestion = (keyword: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<
      ApiResponse<{
        options: string[]
      }>
    >('/suggestion', {
      params: {
        q: keyword,
      },
    })
    console.log(res)

    dispatch({
      type: 'search/suggestion',
      payload: res.data.data.options,
    })
  }
}

export const setHistory = (history: string[]) => {
  // 保存到历史记录
  setHistoryStorage(history)
  return {
    type: 'search/history',
    payload: history,
  }
}

// 发送请求，获取搜索结果
export const getSearchResult = (keyword: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<
      ApiResponse<{ results: Article[]; page: number; per_page: number }>
    >('/search', {
      params: {
        q: keyword,
      },
    })
    dispatch({
      type: 'search/result',
      payload: res.data.data.results
    })
  }
}
