import { ApiResponse, User } from "@/types/data";
import { RootThunkAction } from "@/types/store";
import request from "@/utils/request";

// 我的页面 - 个人信息
export const getUser = ():RootThunkAction => { 
  return async (dispath) => { 
    const res = await request.get<ApiResponse<User>>('/User')
    console.log(res);
    dispath({
      type: 'profile/getUser',
      payload: res.data.data
    })
  }
}


// 用户个人信息
export const getUserProfile = (): RootThunkAction => { 
  return async (dispatch) => { 
    const res = await request.get('/user/profile')
    console.log(res);
    dispatch({
      type: 'profile/getUserProfile',
      payload: res.data.data
    })
  }
}

//修改用户个人信息
export const updateUserProfile = (key:string,value:string): RootThunkAction => { 
  return async (dispatch) => { 
    const res = await request.patch('/user/profile', {
      // 属性名表达式
      [key]: value
    })
    console.log(res);
    // 重新获取数据
    await dispatch(getUserProfile())
  }
}

// 修改用户图片
export const updateUserPhoto=(fd: FormData): RootThunkAction => { 
  return async (dispatch) => {
    await request.patch('/user/photo', fd)
    // 重新获取数据
    await dispatch(getUserProfile())
  }
}