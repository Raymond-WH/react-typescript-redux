// 存放redux相关所有类型
// RootState
// RootAction
// RootThunAction
// 各个模块的Action

import store from "@/store";
import { ThunkAction } from "redux-thunk";
import { Token, UserProfile } from "./data";

// store的state的类型
export type RootState = ReturnType<typeof store.getState>;
// 所有的Action的类型
export type RootAction = LoginAction |ProfileAction|ChannelAction;
// 所有的ThunkAction的类型
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
// 各个默认的Action的类型
export type LoginAction = {
  type: 'login/login',
  payload: Token
} | {
  type: 'login/logout',
}

export type ProfileAction =
  | {
      type: 'profile/getUser'
      payload: User
    }
  | {
      type: 'profile/getUserProfile'
      payload: UserProfile
    }


export type ChannelAction = {
  type: 'channel/getUserChannel'
  payload: Channel[]
}