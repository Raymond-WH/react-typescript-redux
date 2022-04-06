import { ApiResponse, User } from "@/types/data";
import { RootThunkAction } from "@/types/store";
import request from "@/utils/request";

// 我的页面 - 个人信息
export const getUser = ():RootThunkAction => { 
  return async (dispath) => { 
    const res = await request.get<ApiResponse<User>>('/User')
    console.log(res);
    dispath({
      type: 'profile/getUser',
      payload: res.data.data
    })
  }
}


// 用户个人信息
export const getUserProfile = (): RootThunkAction => { 
  return async (dispatch) => { 
    const res = await request.get('/user/profile')
    console.log(res);
    dispatch({
      type: 'profile/getUserProfile',
      payload: res.data.data
    })
  }
}