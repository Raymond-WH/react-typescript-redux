import { ApiResponse } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'

export const getSuggestion = (keyword: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<{
      options:string[]
    }>>('/suggestion', {
      params: {
        q: keyword,
      },
    })
    console.log(res);
    
    dispatch({
      type: 'search/suggestion',
      payload: res.data.data.options,
    })
  }
}
