import { NavBar, InfiniteScroll } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { useEffect, useRef, useState } from 'react'
import { getArticleInfo } from '@/store/actions/article'
import { ArticleDetail } from '@/types/data'
import DOMPurify from 'dompurify'
import histhlight from 'highlight.js'
// 要引入样式
import 'highlight.js/styles/monokai-sublime.css'
import { highlight } from '@/utils'
const Article = () => {
  const history = useHistory()

  // 发送请求，获取文章详情
  const [article, SetArticle] = useState<ArticleDetail>({} as ArticleDetail)
  // const articleId = history.location.pathname.split('/')[2]
  // 获取地址里的id值

  const { id } = useParams<{ id: string }>()
  useEffect(() => {
    // 获取文章详情
    getArticleInfo(id).then((res) => {
      console.log(res)

      SetArticle(res.data.data)
    })
  }, [id])

  // 代码高亮
  useEffect(() => { 
    // 忽略警告
    // highlight.configure({
    //   ignoreUnescapedHTML:true
    // })
    histhlight.highlightAll()
  }, [article])
  // 控制滚动事件
  const authorRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  // 一进来需要注册滚动事件
  const [showAuthor,setShowAuthor] = useState(false)
  useEffect(() => { 
    const wrapperDOM = wrapperRef.current!
    const authorDOM = authorRef.current!
    const handleScroll = () => {
      // const { scrollTop } = wrapperDOM
      // const { offsetHeight, scrollHeight } = authorDOM
      // if (scrollTop + offsetHeight >= scrollHeight) {
      //   // 滚动到底部了
      //   console.log('滚动到底部了')
      // }
      const rect = authorDOM.getBoundingClientRect()
      if (rect.top < 0) {
        setShowAuthor(true)
      } else { 
        setShowAuthor(false)
      }
    
    }
    wrapperDOM.addEventListener('scroll', handleScroll)
    
    return () => {
      wrapperDOM.removeEventListener('scroll', handleScroll)
      
    }
  },[])
  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper" ref={wrapperRef}>
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{article.title}</h1>

            <div className="info">
              <span>{article.pubdate}</span>
              <span>{article.read_count} 阅读</span>
              <span>{article.comm_count} 评论</span>
            </div>

            <div className="author" ref={authorRef}>
              <img src={article.aut_photo} alt="" />
              <span className="name">{article.aut_name}</span>
              <span
                className={classNames(
                  'follow',
                  article.is_followed ? 'followed' : ''
                )}
              >
                {article.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          </div>

          <div className="content">
            <div className="content-html dg-html" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(article.content)}} />
            {/* <div className="content-html dg-html" >{ article.content}</div> */}

            <div className="date">发布文章时间：{article.pubdate}</div>
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
          {showAuthor && (
            <div className="nav-author">
              <img src={ article.aut_photo} alt="" />
              <span className="name">{article.aut_name}</span>
              <span className={classNames('follow', article.is_followed ? 'followed' : '')}>
                {article.is_followed ? '已关注' : '关注'}
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
