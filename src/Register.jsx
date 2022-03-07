import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firebaseDatabase } from './FirebaseConfig'
import { child, onValue, ref, set, getDatabase } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const navigate = useNavigate()
  var userCount = 0
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      userCount = userCount + 1
      set(ref(firebaseDatabase, 'users/' + userCount), { name: registerName })
      navigate('/')
      // const db = getDatabase()
      // const starCountRef = ref(db, 'users/' + 1 + '/content')
      // onValue(starCountRef, snapshot => {
      //   const data = snapshot.val()
      //   console.log('hi')
      //   console.log(data)
      //   // updateStarCount(postElement, data)
      // })
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
