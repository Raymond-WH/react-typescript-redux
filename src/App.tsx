import { Router,Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import './App.scss'
import React, { Suspense} from 'react'
import PrivateRoute from './components/PrivateRoute'

import history from './utils/history'
import Layout from './pages/Layout'
const NotFound = React.lazy(()=> import('./pages/NotFound'))
const Chat = React.lazy(()=> import('./pages/Profile/Chat'))
const ProfileEdit = React.lazy(()=> import( './pages/Profile/Edit'))
const Search = React.lazy(()=> import( './pages/Search'))
const SearchResult = React.lazy(()=> import( './pages/Search/Result'))
const Article = React.lazy(()=> import( './pages/Article'))
const KeepAlive = React.lazy(()=> import( './components/KeepAlive'))
const Login = React.lazy(() => import('./pages/Login'))
// const Layout = React.lazy(() => import('./pages/Layout'))

function App() {

  // const { pathname} = useLocation()
  return (
    <Suspense fallback={ <div>一级路由loading...</div>}>
      <Router history={history}>
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

          <KeepAlive path="/home">
            <Layout></Layout>
          </KeepAlive>
          <Switch>
            {/* 首页页面 */}
            {/* <Route path="/home">
            <Layout></Layout>
          </Route> */}
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
            {/* 聊天功能 */}
            <PrivateRoute path="/chat">
              <Chat></Chat>
            </PrivateRoute>
            <Route path="/search" exact>
              <Search></Search>
            </Route>
            <Route path="/search/result">
              <SearchResult></SearchResult>
            </Route>
            {/* 404页面 */}
            <Route path="/article/:id">
              <Article></Article>
            </Route>
            {history.location.pathname !== '/home' && (
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            )}
          </Switch>
        </div>
      </Router>
    </Suspense>
  )
}

export default App
