import { NavBar, InfiniteScroll, Popup, Toast } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { useEffect, useRef, useState } from 'react'
import {
  addCommentFn,
  collectArticle,
  followUser,
  getArticleComments,
  getArticleInfo,
  likeArticle,
  unCollectArticle,
  unFollowUser,
  unLikeArticle,
} from '@/store/actions/article'
import { ArticleDetail, CommentRes } from '@/types/data'
import DOMPurify from 'dompurify'
import highlight from 'highlight.js'
// 要引入样式
import 'highlight.js/styles/monokai-sublime.css'
import CommentInput from './components/CommentInput'
import CommentReply from './components/CommentReply'
import produce from 'immer'
// import { highlight } from '@/utils'
// import { useDispatch } from 'react-redux'
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
      // console.log(res)

      SetArticle(res.data.data)
    })
  }, [id])

  // 代码高亮
  useEffect(() => {
    // 忽略警告
    highlight.configure({
      ignoreUnescapedHTML: true,
    })
    highlight.highlightAll()
  }, [article])
  // 控制滚动事件
  const authorRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  // 一进来需要注册滚动事件
  const [showAuthor, setShowAuthor] = useState(false)
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
  }, [])

  const [commentRes, setCommentRes] = useState<CommentRes>({
    results: [],
    total_count: 100,
    last_id: '',
    end_id: '',
  } as CommentRes)

  const loadMore = async () => {
    const res = await getArticleComments(id, commentRes.last_id)
    console.log(res)

    setCommentRes({
      ...res.data.data,
      results: [...commentRes.results, ...res.data.data.results],
    })
    // console.log(commentRes);
  }
  // console.log(commentRes)
  const hasMore = commentRes.results.length < commentRes.total_count
  // 切换关注用户
  // const [follow,setFollow] = useState(false)
  const toggleFollow = async () => {
    // 判断用户是否关注
    if (article.is_followed) {
      // 取消关注
      // 发送请求
      await unFollowUser(article.aut_id)
    } else {
      // 关注
      // 发送请求
      await followUser(article.aut_id)
    }
    // 更新文章
    SetArticle({
      ...article,
      is_followed: !article.is_followed,
    })
  }

  // 切换收藏
  const toggleAttitude = async (attitude: number) => {
    // console.log(attitude);

    if (attitude === -1) {
      await likeArticle(article.art_id)
      // console.log(attitude);
    } else {
      await unLikeArticle(article.art_id)
    }
    // 修改文章态度
    SetArticle({
      ...article,
      attitude: attitude === -1 ? 1 : -1,
    })
  }

  const toggleCollect = async (is_collected: boolean) => {
    if (is_collected) {
      // 取消收藏
      await collectArticle(article.art_id)
    } else {
      // 收藏
      await unCollectArticle(article.art_id)
    }
    // 修改文章收藏状态
    SetArticle({
      ...article,
      is_collected: !article.is_collected,
    })
  }

  const [isComment, setIsComment] = useState(false)
  // 评论跳转
  const commentRef = useRef<HTMLDivElement>(null)
  const goComment = () => {
    // console.log('ddd');

    const wrapperDOM = wrapperRef.current!
    const commentDOM = commentRef.current!
    if (isComment) {
      // 跳转到评论地方
      // console.log(isComment);

      wrapperDOM.scrollTo(0, commentDOM.offsetTop - 50)
    } else {
      // 跳转到顶部
      wrapperDOM.scrollTo(0, 0)
    }
    setIsComment(!isComment)
  }

  // 弹层
  const [commentShow, SetCommentShow] = useState(false)
  const hideComment = () => {
    SetCommentShow(false)
  }
  const showComment = () => {
    SetCommentShow(true)
  }

  // 发表评论
  const addComment = async (value: string) => {
    // console.log(value);
    // 发送请求
    const res = await addCommentFn(article.art_id, value)
    Toast.show('评论成功')
    // 关闭弹层
    hideComment()
    // 重新渲染
    console.log(res)

    setCommentRes({
      ...commentRes,
      // total_count:commentRes.total_count+1,
      results: [res.data.data.new_obj, ...commentRes.results],
      total_count: commentRes.total_count + 1,
    })
  }

  // 控制回复显示和隐藏
  const [replyShow, setReplyShow] = useState({
    visibile: false,
    comment_id: '',
  })
  const hideReply = () => {
    setReplyShow({
      visibile: false,
      comment_id: '',
    })
  }
  const showReply = (comment_id: string) => {
    setReplyShow({
      visibile: true,
      comment_id,
    })
  }
  // 让评论的数量加一
  const addReplyCount = (comment_id: string) => {
    setCommentRes(
      produce((draft: CommentRes) => {
        const obj = draft.results.find((item) => item.com_id === comment_id)
        obj!.reply_count += 1
      })
    )
  }

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
                onClick={toggleFollow}
              >
                {article.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          </div>

          <div className="content">
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content),
              }}
            />
            {/* <div className="content-html dg-html" >{ article.content}</div> */}

            <div className="date">发布文章时间：{article.pubdate}</div>
          </div>
        </div>

        <div className="comment" ref={commentRef}>
          <div className="comment-header">
            <span>全部评论（{commentRes.results.length}）</span>
            <span>{article.like_count} 点赞</span>
          </div>

          <div className="comment-list">
            {commentRes.results.map((item) => (
              <CommentItem
                showReply={showReply}
                type="normal"
                key={item.com_id}
                comment={item}
              />
            ))}

            <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
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
              <img src={article.aut_photo} alt="" />
              <span className="name">{article.aut_name}</span>
              <span
                className={classNames(
                  'follow',
                  article.is_followed ? 'followed' : ''
                )}
                onClick={toggleFollow}
              >
                {article.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}
        {/* 底部评论栏 */}
        <CommentFooter
          type="normal"
          article={article}
          toggleAttitude={toggleAttitude}
          toggleCollect={toggleCollect}
          goComment={goComment}
          showComment={showComment}
        />
        {/* 弹层 */}
        {/* destroyOnClose关闭弹窗完成清空 */}
        <Popup destroyOnClose visible={commentShow} position="right">
          <CommentInput
            hideComment={hideComment}
            addComment={addComment}
          ></CommentInput>
        </Popup>
        {/* 回复的显示和隐藏 */}
        <Popup visible={replyShow.visibile} position="right" destroyOnClose>
          <CommentReply
            comment={commentRes.results.find(
              (item) => item.com_id === replyShow.comment_id
            )}
            hideReply={hideReply}
            addReplyCount={addReplyCount}
          ></CommentReply>
        </Popup>
      </div>
    </div>
  )
}

export default Article
