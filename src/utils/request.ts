// 封装axios
import { Toast } from 'antd-mobile'
import axios, { AxiosError } from 'axios'
import { getToken } from './storage'

const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
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
  function (error: AxiosError<{ message: string }>) {
    console.dir(error)
    if (!error.response) {
      // 由于网络繁忙导致请求失败
      Toast.show('网络繁忙，请稍后再试')
    } else {
      // 不是网络繁忙导致请求失败
      // console.log('我是错误');
      console.log(error.response.data.message);
      
      Toast.show(error.response.data.message)
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
