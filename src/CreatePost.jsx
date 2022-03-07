import { useState } from 'react'
import Taskbar from './Taskbar'
import { firebaseDatabase } from './FirebaseConfig'
import { ref, set } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
//import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState()
  const [postContent, setPostContent] = useState()
  const setI = useSelector(state => state.setUser)
  const dispatch = useDispatch()
  //const navigate = useNavigate()

  const postHandle = async () => {
    const temp = 1

    dispatch({ type: 'setId', tempId: temp })
    dispatch({ type: 'setPostTitle', tempTitle: postTitle })
    dispatch({ type: 'setPostContent', tempContent: postContent })
    try {
      set(ref(firebaseDatabase, 'users/' + 1), setI)
    } catch (error) {
      console.log(error.message)
    }
  }

  const draftPostHandle = async () => {
    dispatch({ type: 'setDraftPostTitle', tempTitle: postTitle })
    dispatch({ type: 'setDraftPostContent', tempContent: postContent })
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
              setPostTitle(event.target.value)
            }}
          ></input>
        </div>
        <div className='postTitle'>
          <h1>Content </h1>
          <input
            onChange={event => {
              setPostContent(event.target.value)
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
