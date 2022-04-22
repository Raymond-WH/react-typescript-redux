import { useHistory } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

import styles from './index.module.scss'

const Result = () => {
  const history = useHistory()

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
