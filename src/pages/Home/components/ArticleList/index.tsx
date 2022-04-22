import { getArticleList, getNewArticleList } from '@/store/actions/home'
import { RootState } from '@/types/store'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleItem from '../ArticleItem'
import styles from './index.module.scss'

type Props = {
  channelId: number
}
const ArticleList = ({ channelId }: Props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticleList(channelId, Date.now()))
  }, [dispatch, channelId])
  const {
    home: { articles },
  } = useSelector((state: RootState) => state)
  const { results = [], timestamp } = articles[channelId] || {}
  // 是否还有更多
  const hasMore = timestamp !== null && results.length <= 100
  const loadMore = async () => {
    await dispatch(getArticleList(channelId, timestamp || Date.now()))
  }
  // 下拉刷新
  const onRefresh = async () => {
    // console.log('lllll');

    await dispatch(getNewArticleList(channelId, Date.now()))
  }
  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}

      <PullToRefresh onRefresh={onRefresh}>
        {results.map((item, index) => (
          <div className="article-item" key={index}>
            <ArticleItem article={item} />
          </div>
        ))}
      </PullToRefresh>

      {/* 无线加载组件 */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
    </div>
  )
}

export default ArticleList
