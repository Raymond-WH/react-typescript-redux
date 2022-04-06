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