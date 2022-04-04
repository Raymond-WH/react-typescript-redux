import { Loginform } from "@/types/data";
import { RootThunkAction } from "@/types/store";
import request from '@/utils/request';

export const login = (values:Loginform):RootThunkAction => { 
  return async dispath => { 
    const res = await request.post('/authorizations', values);
    console.log(res);
    
  }
}