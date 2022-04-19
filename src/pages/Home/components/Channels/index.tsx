import classnames from 'classnames'

import Icon from '@/components/icon'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/types/store'
type Props = {
  hide: () => void
}
const Channels = ({ hide }: Props) => {
  const { userChannels,allChannels } = useSelector((state: RootState) => state.channel)
  // 获取推荐的频道=所有频道-用户频道
  const recommentChannels = allChannels.filter((item) => { 
    // 如果item在用户频道中存在，就不需要，如果不存在，就保留
    return userChannels.some((v)=>v.id === item.id) === false
  })
  // console.log(recommentChannels)
  
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={hide} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span className="channel-item-edit">编辑</span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannels.map((item) => (
              <span className={classnames('channel-list-item')} key={item.id}>
                {item.name}
                <Icon type="iconbtn_tag_close" />
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
            {recommentChannels.map((item) => (
              <span className="channel-list-item" key={item.id}>{ item.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
