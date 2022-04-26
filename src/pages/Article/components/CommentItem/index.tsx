import dayjs from 'dayjs'
import classnames from 'classnames'

import Icon from '@/components/icon'

import styles from './index.module.scss'

type Props = {
  // normal 普通 - 文章的评论
  // origin 回复评论的原始评论，也就是对哪个评论进行回复
  // reply 回复评论
  type?: 'normal' | 'reply' | 'origin'
}

const CommentItem = ({
  // normal 普通
  // origin 回复评论的原始评论
  // reply 回复评论
  type = 'normal'
}: Props) => {
  // 回复按钮
  const replyJSX =
    type === 'normal' ? (
      <span className="replay">
        0 回复
        <Icon type="iconbtn_right" />
      </span>
    ) : null

  return (
    <div className={styles.root}>
      <div className="avatar">
        <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
      </div>
      <div className="comment-info">
        <div className="comment-info-header">
          <span className="name">黑马先锋</span>
          {/* 文章评论、评论的回复 */}
          {(type === 'normal' || type === 'reply') && (
            <span className="thumbs-up">
              10
              <Icon type={true ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            </span>
          )}
          {/* 要回复的评论 */}
          {type === 'origin' && (
            <span className={classnames('follow', true ? 'followed' : '')}>
              {true ? '已关注' : '关注'}
            </span>
          )}
        </div>
        <div className="comment-content">打破零评论</div>
        <div className="comment-footer">
          {replyJSX}
          {/* 非评论的回复 */}
          {type !== 'reply' && (
            <span className="comment-time">{dayjs().from('2021-01-01')}</span>
          )}
          {/* 文章的评论 */}
          {type === 'origin' && (
            <span className="thumbs-up">
              10
              <Icon type={true ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
