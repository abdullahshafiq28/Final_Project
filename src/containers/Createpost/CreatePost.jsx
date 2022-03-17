import { doc, setDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { firebaseDatabase } from '../../FirebaseConfig'
import { setDraftPost, setPost, setPostId, setdraftPostId } from '../../redux/actions'

const CreatePost = () => {
  const getIds = useSelector(state => state.manageIds)
  const [post, setPostt] = useState({
    title: '',
    content: '',
    id: getIds.postId
  })
  const getUser = useSelector(state => state.setUser)
  const UserCollectionRef = doc(firebaseDatabase, 'users', getUser.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [count, setCount] = useState(0)

  const addPostFirabase = async () => {
    await setDoc(UserCollectionRef, getUser)
  }

  useEffect(() => {
    if (count != 0) {
      navigate('/Home')
    }
    addPostFirabase()
  }, [getUser])

  const reducerHandler = async () => {
    dispatch(setPostId())
    dispatch(setdraftPostId())
    setCount(1)
  }

  return (
    <div className='createPost'>
      <div className='postTitle'>
        <h1>Post Title </h1>
        <input
          className='inputFieldStyle'
          onChange={event => { setPostt({ ...post, title: event.target.value }) }}
        ></input>
      </div>
      <div className='postTitle'>
        <h1>Content </h1>
        <input
          onChange={event => { setPostt({ ...post, content: event.target.value }) }}
          className='contentFieldStyle'
        ></input>
      </div>
      <div className='marginProperty displayProperty'>
        <button
          onClick={() => { reducerHandler(), dispatch(setDraftPost(post)) }}
          className='postButtonStyle'
        >
          Draft
        </button>

        <button
          onClick={() => { reducerHandler(), dispatch(setPost(post)) }}
          className='marginProperty postButtonStyle'
        >
          Post
        </button>
      </div>
    </div>
  )
}

export default CreatePost
