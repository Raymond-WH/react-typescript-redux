
import { ApiResponse, Channel } from "@/types/data";
import { ChannelAction, RootThunkAction } from "@/types/store";
import request from '@/utils/request'
import { getChannels, hasToken, setChannels } from "@/utils/storage";
export const getUserChannel = (): RootThunkAction => { 
  
  return async (dispatch) => {
    // 判断是否登录
    if (hasToken()) {
      // 登陆了
      const res = await request.get<ApiResponse<{ channels: Channel[] }>>(
        '/user/channels'
      )
      dispatch({
        type: 'channel/getUserChannel',
        payload: res.data.data.channels,
      })
      return
    }
    // 没有登录优先从本地获取
    const channels = getChannels()
    // 本地有数据
    if (channels.length > 0) {
      dispatch({
        type: 'channel/getUserChannel',
        payload: channels,
      })
    } else {
      // 没有本地获取从服务器获取
      // 登陆了
      const res = await request.get<ApiResponse<{ channels: Channel[] }>>(
        '/user/channels'
      )
      dispatch({
        type: 'channel/getUserChannel',
        payload: res.data.data.channels,
      })
      // 存储到本地
      setChannels(res.data.data.channels)
    }

    // console.log(res);
    // console.log(res.data.data.channels);
  }
}

 /**
  * 获取所有频道数据
  * @returns
  */
export const getAllChannel = (): RootThunkAction => { 
  return async (dispatch) => {
    const res = await request.get<ApiResponse<{ channels: Channel[] }>>(
      '/channels'
    )
    dispatch({
      type: 'channel/getAllChannel',
      payload: res.data.data.channels,
    })
  }
}

export const changeActive = (id:number):ChannelAction => { 
  return {
    type: 'channel/changeActive',
    payload: id,
  }
}

export const addChannel = (channel: Channel): RootThunkAction => { 
  return async (dispatch, getState) => { 
    // console.log(getState());
    const { userChannels } = getState().channel
    const newChannels = [...userChannels, channel]
    // 判断是否登录，登陆了就添加到服务器，没有登陆就添加到本地
    if (hasToken()) {
      // 发送请求添加频道
      await request.put('/user/channels', {
        channels: newChannels
      })
    } else { 
      // 存储到本地
      setChannels(newChannels)
    }
    // 保存到redux
    dispatch({
      type: 'channel/getUserChannel',
      payload: newChannels,
    })
  }
}


export const delChannel = (channel: Channel): RootThunkAction => {
  return async (dispatch, getState) => {
    // console.log(getState());
    const { userChannels } = getState().channel
    const newChannels = userChannels.filter(item => item.id !== channel.id)
    // 判断是否登录，登陆了就添加到服务器，没有登陆就添加到本地
    if (hasToken()) {
      // 发送请求添加频道
      await request.put('/user/channels', {
        channels: newChannels,
      })
    } else {
      // 存储到本地
      setChannels(newChannels)
    }
    // 保存到redux
    dispatch({
      type: 'channel/getUserChannel',
      payload: newChannels,
    })
  }
}