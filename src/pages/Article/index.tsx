import { NavBar, InfiniteScroll } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { useEffect, useState } from 'react'
import { getArticleInfo } from '@/store/actions/article'
import { ArticleDetail } from '@/types/data'

const Article = () => {
  const history = useHistory()

  // 发送请求，获取文章详情
  const [article,SetArticle] = useState<ArticleDetail>({}as ArticleDetail)
  // const articleId = history.location.pathname.split('/')[2]
  // 获取地址里的id值

  const { id } = useParams<{ id: string }>()
  useEffect(() => { 
    // 获取文章详情
    getArticleInfo(id).then(res => { 
      console.log(res);
      
      SetArticle(res.data.data)
    })
  },[id])
  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{ article.title}</h1>

            <div className="info">
              <span>{ article.pubdate}</span>
              <span>{ article.read_count} 阅读</span>
              <span>{article.comm_count} 评论</span>
            </div>

            <div className="author">
              <img src={article.aut_photo}alt="" />
              <span className="name">{article.aut_name}</span>
              <span className={classNames('follow', article.is_followed ? 'followed' : '')}>
                {article.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          </div>

          <div className="content">
            <div className="content-html dg-html" dangerouslySetInnerHTML={{__html:article.content}} />
            <div className="date">发布文章时间：{ article.pubdate}</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（10）</span>
            <span>20 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll
              hasMore={false}
              loadMore={async () => {
                console.log(1)
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {true && (
            <div className="nav-author">
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">黑马先锋</span>
              <span className={classNames('follow', true ? 'followed' : '')}>
                {true ? '已关注' : '关注'}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  )
}

export default Article
