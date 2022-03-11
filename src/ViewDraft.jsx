import Taskbar from './Taskbar'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firebaseDatabase } from './FirebaseConfig'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const ViewDraft = () => {
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
  const [user, setUser] = useState([])
  const [delPost, setDelPost] = useState()
  const getUser = useSelector(state => state.setUser)
  const UserCollectionRef = collection(firebaseDatabase, 'users')
  const UserCollection = doc(firebaseDatabase, 'users', getUser.id)
  var data
  useEffect(async () => {
    data = await getDocs(UserCollectionRef)
    data.docs.map(temp => {
      if (temp.id == getUser.id) {
        setUser({ ...temp.data(), id: temp.id })
      }
    })
  }, [])

  const editDeleteHandle = () => {
    getUser.posts.map(temp => {
      if (temp.id == delPost) {
        console.log('That Post', temp.id)
        dispatch({ type: 'deleteDraftPost', tempPost: temp.id })
      }
    })
    setDoc(UserCollection, getUser)
    console.log('POst Published')
    navigate('/')
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
            <h1>Draft POSTS</h1>
          </div>
          {user?.draftPosts?.map(temp => {
            return (
              <>
                <div className='row postTitle marginTop'>
                  <h2>{temp.title}</h2>
                </div>
                <div className='marginPropertyLeft'>
                  <button
                    className='loginbutton'
                    onClick={() => {
                      setDelPost(temp.id)
                      dispatch({ type: 'setPost', tempPost: temp })

                      editDeleteHandle()
                    }}
                  >
                    {' '}
                    Publish
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
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ViewDraft
