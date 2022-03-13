import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { auth } from '../../FirebaseConfig'
import { InputField } from '../../components'

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const register = async () => {
    const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    console.log(user)
    dispatch({ type: 'setName', myName: registerName })
    navigate('/')
  }

  return (
    <div className='boxDesign'>
      <div className='row'>
        <h1> Register User </h1>
      </div>
      <InputField 
        onChange={ event => { 
          setRegisterName(event.target.value)
        }}
        styling={{ container: 'smallStyle', mytext: 'Name' }}
      />
      <InputField 
        onChange={ event => { 
          setRegisterEmail(event.target.value)
        }}
        styling={{ container: 'smallStyle', mytext: 'Email...' }}
      />
      <InputField 
        onChange={ event => { 
          setRegisterPassword(event.target.value)
        }}
        styling={{ container: 'smallStyle', mytext: 'Password...' }}
      />
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
