import { Channel, Token } from "@/types/data";

// 本地存储
const TOKEN_KEY = 'redux_mobile_token'

const CHANNEL_KEY = 'redux_mobile_channel'
/**
 * 保存频道数据
 * @param channels 
 */
export function setChannels(channels: Channel[]): void { 
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))

}
/**
 * 获取频道列表数据
 * @returns
 */
export function getChannels(): Channel[] { 
  const channels = localStorage.getItem(CHANNEL_KEY)
  if (channels) { 
    return JSON.parse(channels)
  }
  return []
}
/**
 * 
 * @param token 
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