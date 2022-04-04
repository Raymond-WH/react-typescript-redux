// 存放redux相关所有类型
// RootState
// RootAction
// RootThunAction
// 各个模块的Action

import store from "@/store";

// store的state的类型
export type RootState = ReturnType<typeof store.getState>;
// 所有的Action的类型
export type RootAction = LoginAction
// 所有的ThunkAction的类型
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
// 各个默认的Action的类型
export type LoginAction = {
  type:'login/login',
}