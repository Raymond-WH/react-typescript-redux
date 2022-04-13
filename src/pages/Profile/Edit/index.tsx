import { getUserProfile } from '@/store/actions/profile'
import { RootState } from '@/types/store'
import { Button, List, DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import styles from './index.module.scss'
import { useInitialState} from '@/utils/hooks'
const Item = List.Item

const ProfileEdit = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getUserProfile())
  // }, [dispatch])
  const history = useHistory()
  // const {userProfile} = useSelector((state: RootState) => { 
    
  //   return state.profile
  // })
  // console.log(userProfile)
  const {userProfile} = useInitialState(getUserProfile,'profile')
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0'
          }}
          onBack={() => history.go(-1)}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img
                    width={24}
                    height={24}
                    src={userProfile.photo}
                    alt=""
                  />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item arrow extra={userProfile.name}>
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {userProfile.intro||'未填写'}
                </span>
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={userProfile.gender===0?'男':'女'}>
              性别
            </Item>
            <Item arrow extra={userProfile.birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
