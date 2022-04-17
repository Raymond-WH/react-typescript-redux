import { hasToken } from '@/utils/storage'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'

export default function PrivateRoute({children,...rest}: RouteProps) {
  // console.log(props.children)
  const location = useLocation()
  
  return <Route {...rest} render={() => {
    if (hasToken()) {
      return children
    } else {
      // return <Redirect to="/login"></Redirect>
      return <Redirect to={{
        pathname: '/login',
        state: {
          // aa: 'bb',
          from:location.pathname
        }
      }}></Redirect>
    }
  }}></Route>
}
