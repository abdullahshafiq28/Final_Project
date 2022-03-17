import { collection, getDocs } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { auth, firebaseDatabase } from '../../FirebaseConfig'
import { InputField } from '../../components'
import { setName, setDraftPost, setPost, setId, setIsLogin, setPostId, setdraftPostId} from '../../redux/actions'
 
const Login = () => {
  const [loading, setLoading] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [userData, setUserData] = useState()
  const [displayError, setDisplayError] = useState()
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
     try{
       const user = await signInWithEmailAndPassword(auth, email, password)
       userData.docs.forEach(temp => {
        if (temp.id == user.user.uid) {
          dispatch(setName(temp.data().name))
          temp.data().posts.map(temp => {
            dispatch(setPost(temp))
            dispatch(setPostId())
          })
          temp.data().draftPosts.map(temp => {
            dispatch(setDraftPost(temp))
            dispatch(setdraftPostId())
          })
        }
      })
      dispatch(setId(user.user.uid))
      dispatch(setIsLogin())
      navigate('/Home')
    }
    catch(error){
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
            onChange={ event => { 
              setEmail(event.target.value)
            }}
            styling={{ container: 'smallStyle', mytext: 'Email...' }}
            type={'email'}
          />
          <InputField 
            onChange={event => {
              setPassword(event.target.value)
            }}
            styling={{ container: 'smallStyle', mytext: 'Password...' }}
            type={'password'}
          />
          <div className='errorclass'>
            <h5> {displayError}  </h5>
          </div> 
          <div className='row'>
            <button  disabled={ !password || !email} className='loginbutton' onClick={login}>
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
