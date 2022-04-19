// import Icon from '@/components/Icon'
import Icon from '@/components/icon'
import { getUserProfile } from '@/store/actions/profile'
import { useInitialState } from '@/utils/hooks'
import { baseURL } from '@/utils/request'
import { getToken } from '@/utils/storage'
import { NavBar, Input, Toast } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import styles from './index.module.scss'
type State = {
  type: 'robot' | 'user'
  text: string
}[]
const Chat = () => {
  const history = useHistory()
  // 获取用户头像
  const { userProfile } = useInitialState(getUserProfile, 'profile')
  // useRef的返回结果默认是不允许修改current属性的，只能配合ref属性来使用
  // 如果希望current属性可以被修改，需要联合是用|null
  const socketRef = useRef<Socket | null>(null)
  // 页面加载建立连接
  useEffect(() => {
    const socket = io(baseURL, {
      query: {
        token: getToken().token,
      },
      transports: ['websocket'],
    })
    socketRef.current = socket
    console.log(socket)
    socket.on('connect', () => {
      Toast.show('连接成功')
      console.log('建立连接')
    })
    socket.on('message', (e) => { 
      console.log('接受到消息', e)
      // 接收到机器人消息
      setMessageList([
        ...messageList,
        {
          type: 'robot',
          text: e.msg,
        }
      ])
      
      
    })
    return () => {
      // 组件卸载需要断开连接
      console.log('断开连接')

      socket.close()
    }
  }, [])
  const listRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')
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
  const send = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value) {
      console.log('发送消息')
      // 把自己的消息添加到消息列表
      setMessageList([
        ...messageList,
        {
          type: 'user',
          text: value,
        },
      ])
      // 清空内容
      setValue('')
      // 主动给服务器发送消息
      socketRef.current?.emit('message', {
        msg: value,
        timestamp: Date.now(),
      })
      
    }
  }
  useEffect(() => { 
    // 发送消息是滚动到最底部
    listRef.current?.scrollTo(0, listRef.current?.scrollHeight)
  },[messageList])
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={listRef }>
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            return (
              <div className="chat-item user" key={index}>
                <img src={userProfile.photo} alt="" />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border input"
          placeholder="请描述您的问题"
          value={value}
          onChange={(e) => {
            setValue(e)
          }}
          onKeyDown={send}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
