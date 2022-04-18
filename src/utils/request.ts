// 封装axios
import { Toast } from 'antd-mobile'
import axios, { AxiosError } from 'axios'
import { getToken, setToken } from './storage'
import store from '@/store'
const baseURL = 'http://geek.itheima.net/v1_0/'
const instance = axios.create({
  baseURL,
  timeout: 5000,
})

// 添加专门用于刷新的token
const instance2 = axios.create({
  baseURL,
  timeout: 5000,
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 拿token
    const token = getToken()
    if (token.token) {
      config.headers!.Authorization = `Bearer ${token.token}`
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  async function (error: AxiosError<{ message: string }>) {
    console.dir(error)
    if (!error.response) {
      // 由于网络繁忙导致请求失败
      Toast.show('网络繁忙，请稍后再试')
      return Promise.reject(error)
    }
    // } else {
    //   // 不是网络繁忙导致请求失败
    //   // console.log('我是错误');
    //   console.log(error.response.data.message);

    //   Toast.show(error.response.data.message)
    // }
    // 对响应错误做点什么
    // 判断是否是401错误
    if (error.response.status === 401) {
      // 是401错误 没有token token过期
      const token = getToken()
      if (token.token && token.refresh_token) {
        // token过期，尝试刷新token
        try {
          const res = await instance2({
            url: '/authorizations',
            method: 'put',
            headers: {
              Authorization: `Bearer ${token.refresh_token}`,
            },
          })
          
          // 刷新token成功
          console.log('res', res)
          // 将新的token保存的redux中
          store.dispatch({
            type: 'login/login',
            payload:{
              token:res.data.data.token, 
              refresh_token:token.refresh_token,
            }
          })
          setToken({
            token: res.data.data.token,
            refresh_token: token.refresh_token,
          })
        } catch {
          // 刷新token失败
          console.log('刷新token失败')
        }
      } else {
        // 401没有token
        console.log('跳转到登录页面')
      }
    }
    Toast.show(error.response.data.message)
    return Promise.reject(error)
  }
)

export default instance
