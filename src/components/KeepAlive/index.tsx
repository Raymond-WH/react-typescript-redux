import { Route, RouteProps } from 'react-router-dom'
import styles from './index.module.scss'
const KeepAlive = ({ children, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      children={(props) => {
        // console.log(props.match)
        // children函数有一个特点，不管匹不匹配，这个children函数都会执行
        // 特点2：如果放在Switch组件，优先级最低
        // console.log('哈哈哈')
        return (
          <div
            className={styles.root}
            style={{ display: props.match ? 'block' : 'none' }}
          >
            {children}
          </div>
        )
      }}
    />
  )
}
export default KeepAlive
