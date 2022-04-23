import { useHistory } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

import styles from './index.module.scss'
import qs from 'qs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchResult } from '@/store/actions/search'
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
  useEffect(() => { 
    dispatch(getSearchResult(keyword!))
  }, [keyword, dispatch])
  // 获取redux的searchResult数据
  const { result } = useSelector((state: RootState) => state.search)
  console.log(result);
  
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        {result.map((item) => (
          <div className="article-item" key={item.art_id}>
            <ArticleItem article={item}></ArticleItem>
          </div>))}

      </div>
    </div>
  )
}

export default Result
