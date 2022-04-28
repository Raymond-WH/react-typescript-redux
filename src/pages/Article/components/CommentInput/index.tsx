import styles from './index.module.scss'
import { NavBar, TextArea } from 'antd-mobile'
type Props = {
  // 评论的作者的名字
  name?: string
  hideComment: () => void
}
export default function CommentInput({ name,hideComment }: Props) {
  return (
    <div className={styles.root}>
      <NavBar right={<span className="publish">发表</span>} onBack={() => { 
        hideComment()
      }}>
        {name ? '回复评论' : '评论文章'}
      </NavBar>
      <div className="input-area">
        {/* 回复别人的评论时显示：@某某 */}
        {name && <div className="at">@{name}:</div>}

        {/* 评论内容输入框 */}
        <TextArea placeholder="说点什么~" rows={10} />
      </div>
    </div>
  )
}
