import styles from './index.module.scss'
import { NavBar, Form, Input, List, Button } from 'antd-mobile'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { Loginform } from '@/types/data'
import { login } from '@/store/actions/login'
export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const onFinish = (values: Loginform) => { 
    dispatch(login(values))
  }
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      {/* 表单 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>
        {/* 失去焦点的时候以及改变的时候触发校验 */}
        <Form validateTrigger={['onChange', 'onBlur']} onFinish={ onFinish}>
          <Form.Item className="login-item" name="mobile" rules={[
            {
            required: true,
            message:'手机号不能为空'
            },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '手机号格式不正确'
            }
          ]}>
            <Input placeholder="请输入用户名" autoComplete='off'></Input>
          </Form.Item>
          <List.Item
            className="login-code-extra"
            extra={<span className="code-extra">发送验证码</span>}
          >
            <Form.Item className="login-item" name="code" rules={[
              { required: true, message: '验证码不能为空' },
              {pattern: /^\d{6}$/, message: '验证码格式不正确'}
            ]}>
              <Input placeholder="请输入验证码" autoComplete='off'></Input>
            </Form.Item>
          </List.Item>
          <Form.Item>
            {/* 提交表单校验 */}
            <Button color="primary" type='submit' block className="login-submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
