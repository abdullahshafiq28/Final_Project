import { doc, setDoc } from 'firebase/firestore'
import { firebaseDatabase } from '../../FirebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CreatePost = () => {
  const getIds = useSelector(state => state.setHelp)
  const [post, setPost] = useState({
    title: '',
    content: '',
    id: getIds.postId
  })
  const getUser = useSelector(state => state.setUser)
  const UserCollectionRef = doc(firebaseDatabase, 'users', getUser.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const postHandle = async () => {
    dispatch({ type: 'setPostId' })
    dispatch({ type: 'setdraftPostId'})
    dispatch({ type: 'setPost', tempPost: post })
    await setDoc(UserCollectionRef, getUser)
    navigate('/')
  }

  const draftPostHandle = async () => {
    dispatch({ type: 'setPostId' })
    dispatch({ type: 'setdraftPostId'})
    dispatch({ type: 'setDraftPost', tempPost: post })
    await setDoc(UserCollectionRef, getUser)
    navigate('/')
  }
  
  return (
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
  )
}

export default CreatePost
