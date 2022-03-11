import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseDatabase } from './FirebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { auth } from './FirebaseConfig'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Login = () => {
  // const UserCollectionRef = collection(firebaseDatabase, 'users')
  const [loginEmail, setLoginEmail] = useState('ahmed@gmail.com')
  const [loginPassword, setLoginPassword] = useState('123456')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const UserCollection = collection(firebaseDatabase, 'users')

  var data

  useEffect(async () => {
    // setLoading(true)
    data = await getDocs(UserCollection)
    console.log('user id', data)

    // setLoading(false)
  }, [])
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log('user h', user.user.uid)

      data?.docs?.map(temp => {
        console.log('data from db', temp.data())

        if (temp.id == user.user.uid) {
          console.log('dk', data.docs)

          dispatch({ type: 'setName', myName: temp.data().name })
          temp.data().posts.map(temp => {
            dispatch({ type: 'setPost', tempPost: temp })
          })
        }
      })
      dispatch({ type: 'setId', tempId: user.user.uid })

      dispatch({ type: 'setIsLogin' })

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
          value={loginEmail}
          onChange={event => {
            setLoginEmail(event.target.value)
          }}
        />
      </div>
      <div className='row '>
        <input
          className='smallStyle'
          placeholder='Password...'
          value={loginPassword}
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
