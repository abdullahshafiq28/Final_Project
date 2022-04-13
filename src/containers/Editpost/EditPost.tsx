import { confirmAlert } from 'react-confirm-alert'
import { firebaseDatabase } from '../../FirebaseConfig'
import { setDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setPost } from '../../redux/actions'

import 'react-confirm-alert/src/react-confirm-alert.css'

const EditPost = () => {
  const userData = useSelector((state:any) => state.setUser)
  const [postTitle, setPostTitle] = useState<string>(userData.editPost.title)
  const [postContent, setPostContent] = useState<string>(userData.editPost.content)
  const [count, setCount] = useState<number>(0)
  const [post, setPostt] = useState<object>({
    title: '',
    content: '',
    id: userData.editPost.id
  })
  const UserCollection = doc(firebaseDatabase, 'users', userData.id)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submit = () => {
    confirmAlert({
      title: 'Your Post is Successfully Edited!',
      buttons: [
        {
          label: 'Ok',
          onClick: () => navigate('/Home')
        }
      ]
    })
  }

  const addPostFirabase = async () => {
    await setDoc(UserCollection, userData)
  }

  useEffect(() => {
    if (count != 0) {
      submit()
    }
    addPostFirabase()
  }, [userData])

  const handleSubmitButton = () => {
    dispatch(setPost(post))
    setCount(1)
  }

  return (
    <div className='createPost'>
      <div className='postTitle'>
        <h1>Edit Post </h1>
        <input
          className='inputFieldStyle'
          placeholder='Enter title'
          type='title'
          id='titleInput'
          value={postTitle}
          onChange={event => {
            setPostt({ ...post, title: event.target.value })
            setPostTitle(event.target.value)
          }}
        ></input>
      </div>
      <div className='postTitle'>
        <h1>Content </h1>
        <input
          onChange={event => {
            setPostt({ ...post, content: event.target.value })
            setPostContent(event.target.value)
          }}
          className='contentFieldStyle'
          value={postContent}
        ></input>
      </div>
      <div className='marginProperty displayProperty'>
        <button onClick={handleSubmitButton} className='submitButtonStyle'>
          {' '}
          Submit
        </button>
      </div>
    </div>
  )
}

export default EditPost
