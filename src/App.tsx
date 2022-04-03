import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import './App.scss'
import Layout from './pages/Layout'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path='/home'>
          <Layout></Layout>
        </Route>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route exact path='/' render={()=><Redirect to='/home'></Redirect>}></Route>
      </div>
    </Router>
  )
}

export default App
