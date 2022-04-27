import Icon from '@/components/icon'
import { ArticleDetail } from '@/types/data'
import styles from './index.module.scss'

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: 'normal' | 'reply'
  article:ArticleDetail
}

const CommentFooter = ({ type = 'normal',article }: Props) => {
  return (
    <div className={styles.root}>
      <div className="input-btn">
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === 'normal' && (
        <>
          <div className="action-item">
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!article.comm_count && <span className="bage">{article.comm_count}</span>}
          </div>
          <div className="action-item">
            <Icon type={article.attitude===1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
          <div className="action-item">
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
