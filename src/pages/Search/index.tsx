import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/icon'
import styles from './index.module.scss'
// 导入useState
import { useState } from 'react'
import { useDebounceFn} from 'ahooks'
import { useDispatch } from 'react-redux'
import { getSuggestion } from '@/store/actions/search'
const SearchPage = () => {
  const history = useHistory()
  // 使用useState定义搜索框的值
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const { run} = useDebounceFn(() => { 
    console.log('需要搜索');
    dispatch(getSuggestion(value))
    
  })
  const onChange = (e: string) => {
    setValue(e)
    console.log('发送请求')
    // 搜索功能需要防抖
    run()
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={<span className="search-text">搜索</span>}
      >
        {/* 受控组件的方式获取value值 */}

        <SearchBar
          placeholder="请输入关键字搜索"
          value={value}
          onChange={onChange}
        />
      </NavBar>

      {true && (
        <div
          className="history"
          style={{
            display: true ? 'none' : 'block',
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            <span className="history-item">
              <span className="text-overflow">黑马程序员</span>
              <Icon type="iconbtn_essay_close" />
            </span>
          </div>
        </div>
      )}

      <div className={classnames('search-result', true ? 'show' : '')}>
        <div className="result-item">
          <Icon className="icon-search" type="iconbtn_search" />
          <div className="result-value text-overflow">
            <span>黑马</span>
            程序员
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
