import styles from './index.module.scss'
import { NavBar, TextArea } from 'antd-mobile'
import { useState } from 'react'
type Props = {
  // 评论的作者的名字
  name?: string
  hideComment: () => void
  addComment:(value:string)=>void
}
export default function CommentInput({ name, hideComment,addComment }: Props) {
  
  const [value, setValue] = useState('')
  const add = () => { 
    if (!value.trim()) return
    addComment(value)
    // 清空内容
    
  }
  return (
    <div className={styles.root}>
      <NavBar right={<span className="publish" onClick={add}>发表</span>} onBack={() => { 
        hideComment()
      }}>
        {name ? '回复评论' : '评论文章'}
      </NavBar>
      <div className="input-area">
        {/* 回复别人的评论时显示：@某某 */}
        {name && <div className="at">@{name}:</div>}

        {/* 评论内容输入框 */}
        <TextArea placeholder="说点什么~" rows={10} value={value} onChange={(e) => { 
          setValue(e)
        }}/>
      </div>
    </div>
  )
}
