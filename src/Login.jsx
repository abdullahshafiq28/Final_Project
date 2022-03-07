import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './FirebaseConfig'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const navigate = useNavigate()
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log(user)
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='boxDesign'>
      <div className='row'>
        <h1> Login </h1>
      </div>
      <div className='row '>
        <input
          className='smallStyle'
          placeholder='Email...'
          onChange={event => {
            setLoginEmail(event.target.value)
          }}
        />
      </div>
      <div className='row '>
        <input
          className='smallStyle'
          placeholder='Password...'
          onChange={event => {
            setLoginPassword(event.target.value)
          }}
        />
      </div>
      <div className='row'>
        <button className='loginbutton' onClick={login}>
          {' '}
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
