import { firebaseDatabase } from '../../FirebaseConfig'
import { setDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const EditPost = () => {
  const getUser = useSelector(state => state.setUser)
  const [postTitle, setPostTitle] = useState(getUser.editPost.title)
  const [postContent, setPostContent] = useState(getUser.editPost.content)
  const [post, setPost] = useState({
    title: '',
    content: '',
    id: getUser.editPost.id
  })
  const UserCollection = doc(firebaseDatabase, 'users', getUser.id)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandle = () => {
    dispatch({ type: 'setPost', tempPost: post })
    setDoc(UserCollection, getUser)
    navigate('/')
  }

  const handleSubmit = async event => {
    event.preventDefault()
  }
  
  return (
      <div className='createPost'>
        <form className='form-new-post' onSubmit={handleSubmit}>
          <div className='postTitle'>
            <h1>Edit Post </h1>
            <input
              className='inputFieldStyle'
              placeholder='Enter title'
              type='title'
              id='titleInput'
              value={postTitle}
              onChange={event => {
                setPost({ ...post, title: event.target.value })
                setPostTitle(event.target.value)
              }}
            ></input>
          </div>
          <div className='postTitle'>
            <h1>Content </h1>
            <input
              onChange={event => {
                setPost({ ...post, content: event.target.value })
                setPostContent(event.target.value)
              }}
              className='contentFieldStyle'
              value={postContent}
            ></input>
          </div>
          <div className='marginProperty displayProperty'>
            <button onClick={submitHandle} className='submitButtonStyle'>
              {' '}
              Submit
            </button>
          </div>
        </form>
      </div>
  )
}
export default EditPost
