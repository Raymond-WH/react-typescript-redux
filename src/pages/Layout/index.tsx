import styles from './index.module.scss'
import { TabBar } from 'antd-mobile'
import Icon from '@/components/icon'
const tabs = [
  { path: '/home', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
]
export default function Layout() {
  return (
    <div className={styles.root}>
      <TabBar className="tab-bar">
        {tabs.map((item) => (
          <TabBar.Item
            key={item.text}
            icon={<Icon type={item.icon}></Icon>}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}
