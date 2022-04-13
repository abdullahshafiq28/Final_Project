import { confirmAlert } from 'react-confirm-alert'
import { doc, setDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { firebaseDatabase } from '../../FirebaseConfig'
import { setDraftPost, setPost, setPostId, setdraftPostId } from '../../redux/actions'

import 'react-confirm-alert/src/react-confirm-alert.css'

const CreatePost = () => {
  const getIds = useSelector((state:any) => state.manageIds)
  const [post, setPostt] = useState<any>({
    title: '',
    content: '',
    id: getIds.postId
  })

  const getUser = useSelector((state:any) => state.setUser)
  const UserCollectionRef = doc(firebaseDatabase, 'users', getUser.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [count, setCount] = useState<number>(0)

  const submit = () => {
    confirmAlert({
      title: 'Your Post is Successfully Created !!',
      buttons: [
        {
          label: 'Ok',
          onClick: () => navigate('/Home')
        }
      ]
    })
  }

  const addPostFirabase = async () => {
    await setDoc(UserCollectionRef, getUser)
  }

  useEffect(() => {
    if (count != 0) {
      submit()
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
          onChange={event => {
            setPostt({ ...post, title: event.target.value })
          }}
        ></input>
      </div>
      <div className='postTitle'>
        <h1>Content </h1>
        <input
          onChange={event => {
            setPostt({ ...post, content: event.target.value })
          }}
          className='contentFieldStyle'
        ></input>
      </div>
      <div className='marginProperty displayProperty'>
        <button
          onClick={() => {
            reducerHandler(), dispatch(setDraftPost(post))
          }}
          className='postButtonStyle'
          disabled={!post.content || !post.title}
        >
          Draft
        </button>
        <button
          onClick={() => {
            reducerHandler(), dispatch(setPost(post))
          }}
          className='marginProperty postButtonStyle'
          disabled={!post.content || !post.title}
        >
          Post
        </button>
      </div>
    </div>
  )
}

export default CreatePost
