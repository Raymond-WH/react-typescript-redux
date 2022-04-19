// import Icon from '@/components/Icon'
import Icon from '@/components/icon'
import { getUserProfile } from '@/store/actions/profile'
import { useInitialState } from '@/utils/hooks'
import { NavBar, Input } from 'antd-mobile'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
type State = {
  type: 'robot' | 'user'
  text: string
}[]
const Chat = () => {
  const history = useHistory()
  // 获取用户头像
  const { userProfile } = useInitialState(getUserProfile, 'profile')
  const [messageList, setMessageList] = useState<State>([
    {
      type: 'user',
      text: '你好，我是小明',
    },
    {
      type: 'robot',
      text: '你好，我是robot',
    },
  ])

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list">
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div className="chat-item">
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            ;<div className="chat-item user">
              <img src={userProfile.photo} alt="" />
              <div className="message">{item.text}</div>
            </div>
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input className="no-border" placeholder="请描述您的问题" />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
