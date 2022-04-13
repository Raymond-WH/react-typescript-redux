import styles from './index.module.scss'
import { NavBar, Form, Input, List, Button, Toast } from 'antd-mobile'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { Loginform } from '@/types/data'
import { getCode, login } from '@/store/actions/login'
import { useEffect, useRef, useState } from 'react'
import { FormInstance } from 'antd-mobile/es/components/form'
import { InputRef } from 'antd-mobile/es/components/input'
import { useCountDown } from 'ahooks'

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const onFinish = async (values: Loginform) => {
    await dispatch(login(values))
    Toast.show({
      content: '登录成功',
      icon: 'success',
    })
    // 跳转到首页
    history.push('/home')
  }
  // 获取验证码

  const formRef = useRef<FormInstance>(null)
  const mobileRef = useRef<InputRef>(null)
  const [count, setCount] = useState(0)
  const [countDown] = useCountDown({
    targetDate: count,
  })
  // // 定义一个清理定时器的函数
  // let timeRef = useRef(-1)
  // useEffect(() => {
  //   if (count === 0) {
  //     // 清理定时器
  //     clearInterval(timeRef.current)
  //   }
  // }, [count])
  const onGetCode = async () => {
    // // 阻止验证码重复发送
    // if (count > 0) {
    //   return
    // }
    if (countDown > 0) {
      return
    }
    console.log('获取验证码')

    // 获取手机号
    // 校验手机号是否合法
    // 发送验证码
    const mobile = formRef.current!.getFieldValue('mobile')
    const error = formRef.current!.getFieldError('mobile')
    if (!mobile || error.length > 0) {
      // 让手机号输入框获取焦点
      mobileRef.current!.focus()
      return
    }
    await dispatch(getCode(mobile))
    console.log('开启倒计时')
    // 开启倒计时
    setCount(Date.now() + 60 * 1000)
    // setCount(60)
    // timeRef.current = window.setInterval(() => {
    //   setCount((newCount) => {
    //     return newCount - 1
    //   })
    // }, 1000)
  }
  // // 组件销毁的时候，清理定时器
  // useEffect(() => {
  //   return () => {
  //     clearInterval(timeRef.current)
  //   }
  // }, [])
  
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      {/* 表单 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>
        {/* 失去焦点的时候以及改变的时候触发校验 */}
        <Form
          ref={formRef}
          validateTrigger={['onChange', 'onBlur']}
          onFinish={onFinish}
          initialValues={{
            mobile: '17634275135',
            code: '246810',
          }}
        >
          <Form.Item
            // initialValue="17634251475"
            className="login-item"
            name="mobile"
            rules={[
              {
                required: true,
                message: '手机号不能为空',
              },
              {
                pattern: /^1[3456789]\d{9}$/,
                message: '手机号格式不正确',
              },
            ]}
          >
            <Input
              ref={mobileRef}
              placeholder="请输入用户名"
              autoComplete="off"
            ></Input>
          </Form.Item>
          <List.Item
            className="login-code-extra"
            extra={
              <span className="code-extra" onClick={onGetCode}>
                {/* { count === 0 ? '获取验证码' : `${count}s`} */}
                {countDown === 0
                  ? '发送验证码'
                  : `${Math.round(countDown / 1000)}s`}
              </span>
            }
          >
            <Form.Item
              // initialValue="246810"
              className="login-item"
              name="code"
              rules={[
                { required: true, message: '验证码不能为空' },
                { pattern: /^\d{6}$/, message: '验证码格式不正确' },
              ]}
            >
              <Input placeholder="请输入验证码" autoComplete="off"></Input>
            </Form.Item>
          </List.Item>
          <Form.Item>
            {/* 提交表单校验 */}
            <Button
              color="primary"
              type="submit"
              block
              className="login-submit"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
