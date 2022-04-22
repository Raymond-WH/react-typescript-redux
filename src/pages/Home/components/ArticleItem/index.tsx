import classnames from 'classnames'

import Icon from '@/components/icon'

import styles from './index.module.scss'
import { Article } from '@/types/data'
import dayjs from 'dayjs'
import Img from '@/components/Img'
type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  article: Article
}

const ArticleItem = ({ article }: Props) => {
  const {
    cover: { type, images },
    title,
    aut_name,
    pubdate,
    comm_count
    
  } = article
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 && 't3',
          type === 0 && 'none-mt'
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, index) => (
              <div className="article-img-wrapper" key={index}>
                <Img src={item} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs(pubdate).fromNow()}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
