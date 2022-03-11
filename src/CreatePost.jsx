import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { firebaseDatabase } from './FirebaseConfig'
import Taskbar from './Taskbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    id: 0
  })
  let temp = 0
  const getUser = useSelector(state => state.setUser)
  const UserCollectionRef = doc(firebaseDatabase, 'users', getUser.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const postHandle = async () => {
    temp++
    setPost({ ...post, id: temp })
    dispatch({ type: 'setPost', tempPost: post })
    // console.log('user', getUser)
    await setDoc(UserCollectionRef, getUser)
    navigate('/')
  }
  const draftPostHandle = async () => {
    temp++
    setPost({ ...post, id: temp })
    dispatch({ type: 'setDraftPost', tempPost: post })
    await setDoc(UserCollectionRef, getUser)
    navigate('/')
  }
  return (
    <>
      <Taskbar />
      <div className='createPost'>
        <div className='postTitle'>
          <h1>Post Title </h1>
          <input
            className='inputFieldStyle'
            onChange={event => {
              setPost({ ...post, title: event.target.value })
            }}
          ></input>
        </div>
        <div className='postTitle'>
          <h1>Content </h1>
          <input
            onChange={event => {
              setPost({ ...post, content: event.target.value })
            }}
            className='contentFieldStyle'
          ></input>
        </div>
        <div className='marginProperty displayProperty'>
          <button onClick={draftPostHandle} className='postButtonStyle'>
            {' '}
            Draft
          </button>

          <button onClick={postHandle} className='marginProperty postButtonStyle'>
            {' '}
            Post
          </button>
        </div>
      </div>
    </>
  )
}

export default CreatePost
