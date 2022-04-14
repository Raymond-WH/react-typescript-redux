import styles from './index.module.scss'

const EditList = () => {
  return (
    <div className={styles.root}>
      <div className="list-item">男</div>
      <div className="list-item">女</div>

      <div className="list-item">取消</div>
    </div>
  )
}

export default EditList
