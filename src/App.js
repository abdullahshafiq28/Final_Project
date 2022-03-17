import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Taskbar } from './components'
import { Home, CreatePost, Login, Register, EditPost, ViewDraft, ViewPost, GuestView } from './containers'
import './App.css'

const App = () =>  (
  <Router>
    <Taskbar />
    <Routes>
        <Route path='/' element={<GuestView />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Register />} />
        <Route path='/CreatePost' element={<CreatePost />} />
        <Route path='/ViewDraft' element={<ViewDraft />} />
        <Route path='/ViewPost' element={<ViewPost />} />
        <Route path='/EditPost' element={<EditPost />} />
    </Routes>
  </Router>
)

export default App
