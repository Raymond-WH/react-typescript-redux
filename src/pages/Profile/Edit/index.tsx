import { getUserProfile, updateUserPhoto, updateUserProfile } from '@/store/actions/profile'
import { Button, List, DatePicker, NavBar, Popup, Toast } from 'antd-mobile'
import classNames from 'classnames'
import { useHistory } from 'react-router'

import styles from './index.module.scss'
import { useInitialState } from '@/utils/hooks'
import React, { useRef, useState } from 'react'
import EditInput from './components/EditInput'
import { useDispatch } from 'react-redux'
import EditList from './components/EditList'
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
  const dispatch = useDispatch()
  const { userProfile } = useInitialState(getUserProfile, 'profile')
  const [showInput, setShowInput] = useState<{
    visible: boolean
    type: '' | 'name' | 'intro'
  }>({
    visible: false,
    type: '',
  })
  // 关闭弹层
  const hideInput = () => {
    setShowInput({
      visible: false,
      type: '',
    })
  }
  const fileRef = useRef<HTMLInputElement>(null)
  const onUpdate = async (type: string, value: string) => {
    console.log(type, value)
    if (type === 'photo') { 
      // console.log('拍照');
      fileRef.current?.click()
      return
      
    }
    //发送请求
    await dispatch(updateUserProfile(type, value))
    // 提示消息
    Toast.show('修改成功')
    // 关闭弹层
    hideInput()
    hideList()
  }
  // 弹层底部
  const [showList, setShowList] = useState<{
    visible: boolean
    type: '' | 'gender' | 'photo'
  }>({
    visible: false,
    type: '',
  })
  // 隐藏底部弹层
  const hideList = () => {
    setShowList({
      visible: false,
      type: '',
    })
  }
  // 修改头像
  const changePhoto = async(e:React.ChangeEvent<HTMLInputElement>) => { 
    // 获取选择的文件
    const file = e.target.files![0]
    console.log(file);
    
    // 需要上传这张图片
    const fd = new FormData()
    fd.append('photo', file)
    // 发送请求
    await dispatch(updateUserPhoto(fd))
    // 提示消息
    Toast.show('修改成功')
    // 关闭弹层
    hideList()
  }
  return (
    <div className={styles.root}>
      <input type="file" onChange={changePhoto} hidden ref={fileRef}/>
      {/* 右侧弹层 */}
      <Popup
        visible={showInput.visible}
        position="right"
        bodyStyle={{ width: '100vw' }}
        //不可见时卸载内容
        destroyOnClose
      >
        {/* {showInput.visible && (
          <EditInput hideInput={hideInput} type={showInput.type}></EditInput>
        )} */}
        <EditInput
          onUpdate={onUpdate}
          hideInput={hideInput}
          type={showInput.type}
        ></EditInput>
      </Popup>
      {/* 下方弹层 */}
      <Popup
        onMaskClick={hideList}
        visible={showList.visible}
        position="bottom"
        destroyOnClose
      >
        <EditList
          hideList={hideList}
          type={showList.type}
          onUpdate={onUpdate}
        ></EditList>
      </Popup>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0',
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
                  <img width={24} height={24} src={userProfile.photo} alt="" />
                </span>
              }
              arrow
              onClick={() =>
                setShowList({
                  visible: true,
                  type: 'photo',
                })
              }
            >
              头像
            </Item>
            <Item
              arrow
              extra={userProfile.name}
              onClick={() =>
                setShowInput({
                  visible: true,
                  type: 'name',
                })
              }
            >
              昵称
            </Item>
            <Item
              onClick={() =>
                setShowInput({
                  visible: true,
                  type: 'intro',
                })
              }
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {userProfile.intro || '未填写'}
                </span>
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item
              arrow
              extra={userProfile.gender === 0 ? '男' : '女'}
              onClick={() =>
                setShowList({
                  visible: true,
                  type: 'gender',
                })
              }
            >
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
