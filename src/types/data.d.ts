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