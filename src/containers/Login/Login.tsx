import { collection, getDocs } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { auth, firebaseDatabase } from '../../FirebaseConfig'
import { InputField } from '../../components'
import {
  setName,
  setDraftPost,
  setPost,
  setId,
  setIsLogin,
  setPostId,
  setdraftPostId
} from '../../redux/actions'

const  Login = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>()
  const [email, setEmail] = useState < string > ('')
  const [password, setPassword] = useState < string > ('')
  const [userData, setUserData] = useState<any>()
  const [displayError, setDisplayError] = useState < string >('') 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const UserCollection = collection(firebaseDatabase, 'users')

  const getUserDocS = async () => {
    setLoading(true)
    const data = await getDocs(UserCollection)
    setUserData(data)
    setLoading(false)
  }

  useEffect(() => {
    getUserDocS()
  }, [])

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      userData.docs.forEach( (temp:any) => {
        if (temp.id == user.user.uid) {
          dispatch(setName(temp.data().name))
          temp.data().posts.map((temp:any) => {
            dispatch(setPost(temp))
            dispatch(setPostId())
          })
          temp.data().draftPosts.map((temp:any) => {
            dispatch(setDraftPost(temp))
            dispatch(setdraftPostId())
          })
        }
      })
      dispatch(setId(user.user.uid))
      dispatch(setIsLogin())
      navigate('/Home')
    } catch (error) {
      setDisplayError('Fire Authentication Error!')
    }
  }

  return (
    <div>
      {!loading && (
        <div className='boxDesign'>
          <div className='row'>
            <h1> Login </h1>
          </div>
          <InputField
            onChange={(event:any) => {
              setEmail(event.target.value)
            }}
            styling={{ container: 'smallStyle', mytext: 'Email...' }}
            type={'email'}
          />
          <InputField
            onChange={(event:any) => {
              setPassword(event.target.value)
            }}
            styling={{ container: 'smallStyle', mytext: 'Password...' }}
            type={'password'}
          />
          <div className='errorclass'>
            <h5> {displayError} </h5>
          </div>
          <div className='row'>
            <button disabled={!password || !email} className='loginbutton' onClick={login}>
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
