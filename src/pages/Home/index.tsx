import Icon from '@/components/icon'
import { getUserChannel } from '@/store/actions/channel'
import { useInitialState } from '@/utils/hooks'
import { Tabs } from 'antd-mobile'

import styles from './index.module.scss'

const Home = () => {
  const { userChannels } = useInitialState(getUserChannel, 'channel')

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
        <Icon type="iconbtn_channel" />
      </div>
    </div>
  )
}

export default Home
