import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './FirebaseConfig'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user)
      dispatch({ type: 'setName', myName: registerName })
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='boxDesign'>
      <div className='row'>
        <h1> Register User </h1>
      </div>
      <div className='row'>
        <input
          className='smallStyle'
          placeholder='Name'
          onChange={event => {
            setRegisterName(event.target.value)
          }}
        />
      </div>
      <div className='row'>
        <input
          className='smallStyle'
          placeholder='Email...'
          onChange={event => {
            setRegisterEmail(event.target.value)
          }}
        />
      </div>
      <div className='row'>
        <input
          className='smallStyle'
          placeholder='Password...'
          onChange={event => {
            setRegisterPassword(event.target.value)
          }}
        />
      </div>
      <div className='row'>
        <button className='loginbutton' onClick={register}>
          {' '}
          Create User
        </button>
      </div>
    </div>
  )
}

export default Register
