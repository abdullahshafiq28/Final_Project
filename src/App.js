import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './Register'
import CreatePost from './CreatePost'
import Home from './Home'
import Login from './Login';
import ViewDraft from './ViewDraft'

const App = () =>  (
  <Router>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Register />} />
        <Route path='/CreatePost' element={<CreatePost />} />
        <Route path='/ViewDraft' element={<ViewDraft />} />
    </Routes>        
  </Router>
)

export default App;
