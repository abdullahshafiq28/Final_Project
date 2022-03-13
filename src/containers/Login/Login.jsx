import { collection, getDocs } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { auth, firebaseDatabase } from '../../FirebaseConfig'
import { InputField } from '../../components'

const Login = () => {
  const [loading, setLoading] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [userData, setUserData] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const UserCollection = collection(firebaseDatabase, 'users')

  useEffect(async () => {
    setLoading(true)
    const data = await getDocs(UserCollection)
    setUserData(data)
    setLoading(false)
  }, [])

  const login = async () => {
    const user = await signInWithEmailAndPassword(auth, email, password)
    userData?.docs?.map(temp => {
      if (temp.id == user.user.uid) {
        dispatch({ type: 'setName', myName: temp.data().name })
        temp.data().posts.map(temp => {
          dispatch({ type: 'setPost', tempPost: temp })
          dispatch({ type: 'setPostId' })
        })
        temp.data().draftPosts.map(temp => {
          dispatch({ type: 'setDraftPost', tempPost: temp })
          dispatch({ type: 'setdraftPostId'})
        })
      }
    })
    dispatch({ type: 'setId', tempId: user.user.uid })
    dispatch({ type: 'setIsLogin' })
    navigate('/')
  }

  return (
    <div>
      {!loading && (
        <div className='boxDesign'>
          <div className='row'>
            <h1> Login </h1>
          </div>
          <InputField 
            onChange={ event => { 
              setEmail(event.target.value)
            }}
            styling={{ container: 'smallStyle', mytext: 'Email...' }}
          />
          <InputField 
            onChange={event => {
              setPassword(event.target.value)
            }}
            styling={{ container: 'smallStyle', mytext: 'Password...' }}
          />
          <div className='row'>
            <button className='loginbutton' onClick={login}>
              {' '}
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default Login
