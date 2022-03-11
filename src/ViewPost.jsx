import Taskbar from './Taskbar'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firebaseDatabase } from './FirebaseConfig'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const ViewPost = () => {
  const [user, setUser] = useState([])
  const [delPost, setDelPost] = useState()
  const getUser = useSelector(state => state.setUser)
  const UserCollectionRef = collection(firebaseDatabase, 'users')

  const UserCollection = doc(firebaseDatabase, 'users', getUser.id)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const confirm = () => {
    if (getUser.isLogin == 'true') {
      navigate('/CreatePost')
    }
  }
  const ViewDraftPage = () => {
    navigate('/ViewDraft')
  }
  const ViewMyPostPage = () => {
    navigate('/ViewPost')
  }

  var data
  useEffect(async () => {
    // setLoading(true)

    data = await getDocs(UserCollectionRef)
    data.docs.map(temp => {
      if (temp.id == getUser.id) {
        setUser({ ...temp.data(), id: temp.id })
      }
    })

    // setLoading(false)
  }, [])

  const editDeleteHandle = () => {
    getUser.posts.map(temp => {
      console.log('del post', delPost)
      if (temp.id == delPost) {
        console.log('That Post', temp.id)
        dispatch({ type: 'deletePost', tempPost: temp.id })
        setDoc(UserCollection, getUser)
        console.log('POst Deleted')
      }
    })
  }

  return (
    <>
      <Taskbar />
      <div className='row displayProperty'>
        <div className='sideMenu'>
          <div className='menuStyle'>
            <button className='menuButtonStyle' onClick={confirm}>
              Create Post
            </button>
          </div>
          <div className='menuStyle'>
            <button className='menuButtonStyle' onClick={ViewMyPostPage}>
              {' '}
              View Post
            </button>
          </div>
          <div className='menuStyle'>
            <button className='menuButtonStyle' onClick={ViewDraftPage}>
              {' '}
              View Draft
            </button>
          </div>
        </div>

        <div className='posts'>
          <div className='row postTitle'>
            <h1>MY POSTS</h1>
          </div>
          {user?.posts?.map(temp => {
            return (
              <div key={temp.id}>
                <div className='row postTitle marginTop '>
                  <h2>{temp.title}</h2>
                  <h2>{temp.id}</h2>
                </div>
                <div className='marginPropertyLeft'>
                  <button
                    className='loginbutton'
                    onClick={() => {
                      setDelPost(temp.id)
                      editDeleteHandle()
                    }}
                  >
                    {' '}
                    Edit/Delete
                  </button>
                </div>
                <div className='row postContent'>
                  <div className='postContent'>
                    <p>{temp.content}</p>
                  </div>
                </div>

                <div className='author'>
                  <p>~{user.name}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ViewPost
