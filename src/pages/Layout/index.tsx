import styles from './index.module.scss'
import { TabBar } from 'antd-mobile'
import Icon from '@/components/icon'
import { useHistory, useLocation } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import React, { Suspense} from 'react'
import Home from '@/pages/Home'
// const Home = React.lazy(() => import('../Home'))
const Question = React.lazy(() => import('../Question'))
const Profile = React.lazy(() => import('../Profile'))
const Video = React.lazy(() => import('../Video'))
const PrivateRoute = React.lazy(() => import('@/components/PrivateRoute'))
const KeepAlive = React.lazy(() => import('@/components/KeepAlive'))
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
    <Suspense fallback={ <div>二级路由loading..</div>}>
      <div className={styles.root}>
        <KeepAlive path="/home" exact>
          <Home></Home>
        </KeepAlive>
        <Switch>
          {/* <Route exact path="/home">
          <Home></Home>
        </Route> */}
          <Route path="/home/question">
            <Question></Question>
          </Route>
          <Route path="/home/video">
            <Video></Video>
          </Route>
          <PrivateRoute path="/home/profile">
            <Profile></Profile>
          </PrivateRoute>
        </Switch>
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
    </Suspense>
  )
}
