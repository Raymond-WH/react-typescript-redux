import { useHistory } from 'react-router-dom'
import { InfiniteScroll, NavBar } from 'antd-mobile'

import styles from './index.module.scss'
import qs from 'qs'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearchResult, getSearchResult } from '@/store/actions/search'
import { RootState } from '@/types/store'
import ArticleItem from '@/pages/Home/components/ArticleItem'
const Result = () => {
  const history = useHistory()
  // 获取地址栏的keyword参数
  // const keyword = history.location.search.split('=')[1]

  // const res = qs.parse(history.location.search.slice(1))
  // console.log(res);
  // ts内置的urlsearchparams
  const params = new URLSearchParams(history.location.search)
  const keyword = params.get('keyword')
  const dispatch = useDispatch()
  // useEffect(() => { 
  //   dispatch(getSearchResult(keyword!))
  // }, [keyword, dispatch])
  // 获取redux的searchResult数据
  const { result: { results,total_count} } = useSelector((state: RootState) => state.search)
  // console.log(result);
  
  const hasMore = results.length < total_count
  const pageRef = useRef(1)
  const loadMore = async() => { 
    await dispatch(getSearchResult(keyword!, pageRef.current))
    pageRef.current+=1
  }
  // 销毁组件清楚result数据
  useEffect(() => { 
    return () => { 
      dispatch(clearSearchResult())
    }
  },[dispatch])
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        {results.map((item) => (
          <div className="article-item" key={item.art_id}>
            <ArticleItem article={item}></ArticleItem>
          </div>))}
        <InfiniteScroll loadMore={loadMore} hasMore={ hasMore}></InfiniteScroll>
      </div>
    </div>
  )
}

export default Result
