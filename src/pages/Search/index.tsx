import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/icon'
import styles from './index.module.scss'
// 导入useState
import { useState } from 'react'
import { useDebounceFn} from 'ahooks'
import { useDispatch, useSelector } from 'react-redux'
import { getSuggestion, setHistory } from '@/store/actions/search'
import { RootState } from '@/types/store'
import { highlight } from '@/utils'
const SearchPage = () => {
  const history = useHistory()
  // 使用useState定义搜索框的值
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const { suggestion, history: historyList } = useSelector(
    (state: RootState) => state.search
  )
  console.log(suggestion)

  const { run } = useDebounceFn(
    () => {
      console.log('需要搜索')
      // 如果为空不发送请求
      if (!value) return
      dispatch(getSuggestion(value))
    },
    {
      // 加快防抖时间
      wait: 500,
    }
  )
  const onChange = (e: string) => {
    setValue(e)
    if (e) {
      setIsSearch(true)
    } else {
      setIsSearch(false)
    }
    console.log('发送请求')
    // 搜索功能需要防抖
    run()
  }
  const [isSearch, setIsSearch] = useState(false)
  const addHistory = (value: string) => {
    // 添加历史记录不能重复
    const newHistoryList = historyList.filter((item) => item !== value)
    newHistoryList.unshift(value)
    // 添加历史记录不能超过十条
    if (newHistoryList.length > 10) {
      newHistoryList.pop()
    }
    // 保存历史记录到redux
    // dispatch({
    //   type: 'search/history',
    //   payload: newHistoryList
    // })
    dispatch(setHistory(newHistoryList))
  }
  // 清空历史记录
  const clear = () => {
    dispatch(setHistory([]))
  }
  // 删除历史记录
  const delHistory = (value: string) => {
    const newHistoryList = historyList.filter((item) => item !== value)
    dispatch(setHistory(newHistoryList))
  }
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          <span
            className="search-text"
            onClick={() => {
              addHistory(value)
            }}
          >
            搜索
          </span>
        }
      >
        {/* 受控组件的方式获取value值 */}

        <SearchBar
          placeholder="请输入关键字搜索"
          value={value}
          onChange={onChange}
        />
      </NavBar>

      <div
        className="history"
        style={{
          display: isSearch ? 'none' : 'block',
        }}
      >
        <div className="history-header">
          <span>搜索历史</span>
          <span onClick={() => clear()}>
            <Icon type="iconbtn_del" />
            清除全部
          </span>
        </div>

        <div className="history-list">
          {historyList.map((item, index) => (
            <span className="history-item" key={index}>
              <span
                className="text-overflow"
                onClick={() => {
                  addHistory(item)
                }}
              >
                {item}
              </span>
              <Icon
                type="iconbtn_essay_close"
                onClick={() => delHistory(item)}
              />
            </span>
          ))}
        </div>
      </div>

      <div className={classnames('search-result', isSearch ? 'show' : '')}>
        {
          // 推荐渲染
          suggestion.map((item, index) => {
            if (item) {
              return (
                <div
                  className="result-item"
                  key={index}
                  onClick={() => addHistory(item)}
                >
                  <Icon className="icon-search" type="iconbtn_search" />
                  <div
                    className="result-value text-overflow"
                    dangerouslySetInnerHTML={{ __html: highlight(item, value) }}
                  ></div>
                </div>
              )
            } else {
              return <div>没有文章</div>
            }
          })
        }
      </div>
    </div>
  )
}

export default SearchPage
