import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import './App.scss'
import PrivateRoute from './components/PrivateRoute'
import Layout from './pages/Layout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProfileEdit from './pages/Profile/Edit'
import { hasToken } from './utils/storage'
function App() {
  return (
    <Router>
      <div className="app">
        {/* <h1>App跟组件</h1>
        <ul>
          <li>
            <Link to="/home">布局页面</Link>
          </li>
          <li>
            <Link to="/login">登录页面</Link>
          </li>
        </ul> */}
        {/* 配置路由规则 */}
        <Switch>
          {/* 首页页面 */}
          <Route path="/home">
            <Layout></Layout>
          </Route>
          {/* 登录页面 */}
          <Route path="/login">
            <Login></Login>
          </Route>
          {/* 路由重定向 如果当前url是 / 跳转到 /home */}
          {/* <Redirect exact from="/" to="/home" /> */}
          <Route
            exact
            path="/"
            render={() => <Redirect to="/home"></Redirect>}
          ></Route>
          <PrivateRoute path="/profile/edit">
            <ProfileEdit></ProfileEdit>
          </PrivateRoute>
          {/* <Route
            path="/profile/edit"
            render={() => {
              if (hasToken()) {
                return <ProfileEdit></ProfileEdit>
              } else {
                return <Redirect to="/login"></Redirect>
              }
            }}
          ></Route> */}
          {/* 404页面 */}
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
