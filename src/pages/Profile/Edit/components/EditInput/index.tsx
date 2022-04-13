import { Input, NavBar } from 'antd-mobile'

import styles from './index.module.scss'
type Props = {
  hideInput: () => void
}
const EditInput = ({ hideInput}:Props) => {
  

  return (
    <div className={styles.root}>
      <NavBar
        onBack={hideInput}
        className="navbar"
        right={<span className="commit-btn">提交</span>}
      >
        编辑昵称
      </NavBar>

      <div className="edit-input-content">
        <h3>昵称</h3>

        <div className="input-wrap">
          <Input placeholder="请输入" />
        </div>
      </div>
    </div>
  )
}

export default EditInput
