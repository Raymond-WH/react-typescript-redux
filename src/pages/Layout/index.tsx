import styles from './index.module.scss'
import { TabBar } from 'antd-mobile'
import Icon from '@/components/icon'
import { useHistory, useLocation } from 'react-router'
const tabs = [
  { path: '/home', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
]

export default function Layout() {
  const history = useHistory()
  const location = useLocation()
  // console.log(location)

  const onChangeRoute = (path: string) => {
    // console.log(path)

    history.push(path)
  }  
  return (
    <div className={styles.root}>
      <TabBar
        className="tab-bar"
        onChange={onChangeRoute}
        activeKey={location.pathname}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active) => {
              // console.log(active)
              if (active) {
                // 当前tab激活
                return <Icon type={item.icon + '_sel'}></Icon>
              } else {
                return <Icon type={item.icon}></Icon>
              }
            }}
            // icon={<Icon type={item.icon}></Icon>}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}
