// 存放各种通用的数据
export type Loginform = {
  mobile: string;
  code: string;
}
//统一axios请求的返回类型
export type ApiResponse<T> = {
  message: string;
  data: T;
}

//Token的类型
export type Token = {
  token: string;
  refresh_token: string;
}

// 我的 - 信息
export type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}
// 用户个人信息
export type UserProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}

