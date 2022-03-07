import { useNavigate } from 'react-router-dom'

const Taskbar = () => {
  const navigate = useNavigate()
  const confirmLogin = () => {
    navigate('/Login')
  }
  const confirm = () => {
    navigate('/Signup')
  }

  return (
    <div className='taskBar'>
      <div className='loginButton'>
        <button className='buttonStyle' onClick={confirmLogin}>
          Login
        </button>
      </div>
      <div className='signUpButton'>
        <button className='buttonStyle' onClick={confirm}>
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Taskbar
