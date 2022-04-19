import Icon from '@/components/icon'
import { getUserChannel } from '@/store/actions/channel'
import { useInitialState } from '@/utils/hooks'
import { Popup, Tabs } from 'antd-mobile'
import { useState } from 'react'
import Channels from './components/Channels'

import styles from './index.module.scss'

const Home = () => {
  const { userChannels } = useInitialState(getUserChannel, 'channel')
  const [visible, setVisible] = useState(false)
  const hide = () => { 
    setVisible(false)
  }
  const show = () => { 
    setVisible(true)
  }
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {userChannels.length > 0 && (
        <Tabs className="tabs" activeLineMode="fixed">
          {userChannels.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              {item.name}
            </Tabs.Tab>
          ))}
        </Tabs>
      )}

      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" onClick={show}/>
      </div>
      <Popup position='left' visible={visible}><Channels hide={ hide}></Channels></Popup>
    </div>
  )
}

export default Home
