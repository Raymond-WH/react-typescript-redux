import { ApiResponse, Loginform, Token } from "@/types/data";
import { LoginAction, RootThunkAction } from "@/types/store";
import request from '@/utils/request';
import { removeToken, setToken } from "@/utils/storage";

export const login = (values:Loginform):RootThunkAction => { 
  return async dispath => { 
    const res = await request.post<ApiResponse<Token>>('/authorizations', values);
    // console.log(res);
    // console.log(res.data.data);
    dispath({
      type: 'login/login',
      payload: res.data.data
    })
    // 存储到localStorage中
    setToken(res.data.data)
  }
}
export const getCode = (mobile:string) => { 
  return async () => {
    await request.get(`/sms/codes/${mobile}`)
  }
}

// 退出登录
export const logout=(): LoginAction=>{ 
  removeToken()
  return {
    type: 'login/logout'
  }
}