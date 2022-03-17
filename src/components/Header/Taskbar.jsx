import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const Taskbar = () => {
  const getUser = useSelector(state => state.setUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  return (
    <div className='taskBar'>
      { !getUser.isLogin && (
      <div className='loginButton'>
        <button className='buttonStyle' onClick={ () => {
          navigate('/Login')
        }}>
          Login
        </button>
      </div>
       )}
         { getUser.isLogin && (
      <div className='loginButton'>
        <button className='buttonStyle' onClick={ () => {
           dispatch({ type: 'setLogout' })
           navigate('/')
        }}>
          Logout
        </button>
      </div>
       )}
      <div className='signUpButton'>
        <button className='buttonStyle' onClick={ () => {
           navigate('/Signup')
        }}>
          Sign Up
        </button>
      </div>
    </div>
  )
}
export default Taskbar
