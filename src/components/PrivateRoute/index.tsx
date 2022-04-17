import { hasToken } from '@/utils/storage'
import { Redirect, Route, RouteProps } from 'react-router-dom'

export default function PrivateRoute({children,...rest}: RouteProps) {
  // console.log(props.children)

  return <Route {...rest} render={() => {
    if (hasToken()) {
      return children
    } else {
      return <Redirect to="/login"></Redirect>
    }
  }}></Route>
}
