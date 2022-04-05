import { Token } from "@/types/data";

// 本地存储
const TOKEN_KEY = 'redux_mobile_token'
/**
 *保存token

 */
export function setToken(token:Token):void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

/**
 * 获取token
 * 
 */
export function getToken(): Token { 
  return JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
}

/**
 * 删除token
 */
export function removeToken(): void { 
  localStorage.removeItem(TOKEN_KEY)
}
/**
 * 判断是否有token
 * @returns
 */
export function hasToken(): boolean { 
  return !!getToken().token
}