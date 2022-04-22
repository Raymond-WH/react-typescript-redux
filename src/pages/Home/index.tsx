import Icon from '@/components/icon'
import { changeActive, getAllChannel, getUserChannel } from '@/store/actions/channel'
import { useInitialState } from '@/utils/hooks'
import { Popup, Tabs } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ArticleList from './components/ArticleList'
import Channels from './components/Channels'

import styles from './index.module.scss'

const Home = () => {
  const dispatch = useDispatch()
  const { userChannels,active } = useInitialState(getUserChannel, 'channel')
  useInitialState(getAllChannel,'channel')
  const [visible, setVisible] = useState(false)
  const hide = () => { 
    setVisible(false)
  }
  const show = () => { 
    setVisible(true)
  }
  const history = useHistory()
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {userChannels.length > 0 && (
        <Tabs className="tabs" activeKey={active + ''} onChange={(key) => { 
          dispatch(changeActive(+key))
        }}>
          {userChannels.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              <ArticleList channelId={ item.id}></ArticleList>

            </Tabs.Tab>
          ))}
        </Tabs>
      )}

      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => { 
          history.push('/search')
        }}/>
        <Icon type="iconbtn_channel" onClick={show}/>
      </div>
      <Popup position='left' visible={visible}><Channels hide={ hide}></Channels></Popup>
    </div>
  )
}

export default Home
