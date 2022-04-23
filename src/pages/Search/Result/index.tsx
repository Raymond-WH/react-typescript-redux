import { useHistory } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

import styles from './index.module.scss'
import qs from 'qs'
const Result = () => {
  const history = useHistory()
  // 获取地址栏的keyword参数
  // const keyword = history.location.search.split('=')[1]

  const res = qs.parse(history.location.search.slice(1))
  console.log(res);
  // ts内置的urlsearchparams
  // const params = new URLSearchParams(history.location.search)
  // const keyword = params.get('keyword')
  
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        <div className="article-item">文章列表</div>
      </div>
    </div>
  )
}

export default Result
