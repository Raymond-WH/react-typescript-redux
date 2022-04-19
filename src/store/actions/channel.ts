
import { ApiResponse, Channel } from "@/types/data";
import { RootThunkAction } from "@/types/store";
import request from '@/utils/request'
export const getUserChannel = ():RootThunkAction => { 
  return async (dispatch) => { 
    const res = await request.get<ApiResponse<{ channels: Channel[] }>>('/user/channels')
    // console.log(res);
    // console.log(res.data.data.channels);
    
    dispatch({
      type: 'channel/getUserChannel',
      payload: res.data.data.channels
    })
    
  }
}