import classnames from 'classnames'

import Icon from '@/components/icon'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import { differenceBy } from 'lodash'
import { addChannel, changeActive, delChannel } from '@/store/actions/channel'
import { Channel } from '@/types/data'
import { useState } from 'react'
type Props = {
  hide: () => void
}
const Channels = ({ hide }: Props) => {
  const dispatch = useDispatch()
  const { userChannels, allChannels, active } = useSelector(
    (state: RootState) => state.channel
  )
  // 获取推荐的频道=所有频道-用户频道
  // const recommentChannels = allChannels.filter((item) => {
  //   // 如果item在用户频道中存在，就不需要，如果不存在，就保留
  //   return userChannels.some((v)=>v.id === item.id) === false
  // })
  // console.log(recommentChannels)
  // 根据id的不同来筛选数组
  const recommentChannels = differenceBy(allChannels, userChannels, 'id')

  // 添加频道
  const add = (channel:Channel) => { 
    dispatch(addChannel(channel))
  }
  const[isEdit, setIsEdit] = useState(false)
  // 编辑频道
  const toggle = () => { 
    setIsEdit(!isEdit)
  }
  // 删除
  const del = (channel: Channel) => { 
    if(userChannels.length < 4) { 
      return
    }
    dispatch(delChannel(channel))
  }
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={hide} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item', { edit: isEdit })}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              点击{isEdit ? '删除' : '进入'}频道
            </span>
            <span
              className="channel-item-edit"
              onClick={() => {
                toggle()
              }}
            >
              {isEdit ? '完成' : '编辑'}
            </span>
          </div>
          {/* 渲染我的频道 */}
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannels.map((item) => (
              <span
                className={classnames('channel-list-item', {
                  selected: item.id === active,
                })}
                key={item.id}
                onClick={() => {
                  // 在编辑状态下不准切换
                  if(isEdit)return
                  dispatch(changeActive(item.id))
                  // 关闭弹层
                  hide()
                }}
              >
                {item.name}
                {item.id !== 0 && <Icon type="iconbtn_tag_close" onClick={() => { 
                  del(item)
                }}/>}
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名selected */}
            {recommentChannels.map((item) => (
              <span
                className="channel-list-item"
                key={item.id}
                onClick={() => {
                  add(item)
                }}
              >
                +{item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
