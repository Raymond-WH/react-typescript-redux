import { RootState } from "@/types/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * 1.自动useEffect发送请求
 * 通过useSelector获取数据并返回
 *
*/
export function useInitialState<K extends keyof RootState>(action: () => void, stateName: K) { 
  const dispatch = useDispatch()
  //进入组件，就发送请求
  useEffect(() => { 
    dispatch(action())
  }, [dispatch, action])
  // 进入组件，就需要获取redux中的数据

  const state = useSelector((state: RootState) => state[stateName])
  return state
}