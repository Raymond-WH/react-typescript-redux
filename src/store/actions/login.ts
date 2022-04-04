import { ApiResponse, Loginform, Token } from "@/types/data";
import { RootThunkAction } from "@/types/store";
import request from '@/utils/request';

export const login = (values:Loginform):RootThunkAction => { 
  return async dispath => { 
    const res = await request.post<ApiResponse<Token>>('/authorizations', values);
    console.log(res);
    console.log(res.data.data);
    dispath({
      type: 'login/login',
      payload: res.data.data
    })
    
  }
}