import Icon from '@/components/icon'
import { ArticleDetail } from '@/types/data'
import styles from './index.module.scss'

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: 'normal' | 'reply'
  article: ArticleDetail
  toggleAttitude: (attitude: number) => void
  toggleCollect: (collect: boolean) => void
  goComment: () => void
}

const CommentFooter = ({ type = 'normal',article,toggleAttitude,toggleCollect,goComment }: Props) => {
  return (
    <div className={styles.root}>
      <div className="input-btn">
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === 'normal' && (
        <>
          <div className="action-item" onClick={() => { 
            
          }}>
            <Icon type="iconbtn_comment" onClick={() => { goComment()}}/>
            <p>评论</p>
            {!!article.comm_count && <span className="bage">{article.comm_count}</span>}
          </div>
          <div className="action-item" onClick={() => { 
            toggleAttitude(article.attitude)
          }}>
            <Icon type={article.attitude===1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
          <div className="action-item" onClick={() => { 
            toggleCollect(article.is_collected)
          }}>
            <Icon type={article.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === 'reply' && (
        <div className="action-item">
          <Icon type={true ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
