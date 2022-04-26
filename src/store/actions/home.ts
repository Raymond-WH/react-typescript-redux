import { ApiResponse, Article } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'
export const getArticleList = (
  channel_id: number,
  timestamp: number
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<
      ApiResponse<{
        pre_timestamp: string
        results: Article[]
      }>
    >('/articles', {
      params: {
        channel_id,
        timestamp,
      },
    })
    // console.log(res)
    dispatch({
      type: 'home/getArticleList',
      payload: {
        timestamp: +res.data.data.pre_timestamp,
        channel_id,
        results: res.data.data.results,
      },
    })
  }
}
export const getNewArticleList = (
  channel_id: number,
  timestamp: number
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<
      ApiResponse<{
        pre_timestamp: string
        results: Article[]
      }>
    >('/articles', {
      params: {
        channel_id,
        timestamp,
      },
    })
    console.log(res)
    dispatch({
      type: 'home/getNewArticleList',
      payload: {
        timestamp: +res.data.data.pre_timestamp,
        channel_id,
        results: res.data.data.results,
      },
    })
  }
}