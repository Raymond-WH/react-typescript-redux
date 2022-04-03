import { Button } from "antd-mobile";
import './index.scss'
import Icon from '@/components/icon'
export default function Layout() {
  return (
    <div>
      <div className="demo">布局组件</div>
      <Button color="primary">primary</Button>
      <Button color="success">success</Button>
      <hr />
      <Icon type="iconbianji"></Icon>
      
    </div>
  )
}
