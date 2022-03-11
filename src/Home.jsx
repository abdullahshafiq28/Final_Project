import Taskbar from './Taskbar'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firebaseDatabase } from './FirebaseConfig'
import { useSelector } from 'react-redux'

const Home = () => {
  const navigate = useNavigate()
  const confirm = () => {
    if (getUser.isLogin == 'true') {
      navigate('/CreatePost')
    }
  }
  const ViewDraftPage = () => {
    if (getUser.isLogin == 'true') {
      navigate('/ViewDraft')
    }
  }
  const ViewMyPostPage = () => {
    if (getUser.isLogin == 'true') {
      navigate('/ViewPost')
    }
  }
  const [user, setUser] = useState([])
  const UserCollectionRef = collection(firebaseDatabase, 'users')
  const getUser = useSelector(state => state.setUser)
  var data
  useEffect(async () => {
    data = await getDocs(UserCollectionRef)

    setUser(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }, [])

  console.log('get User', getUser)
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
            <h1>POSTS</h1>
          </div>
          {user?.map(doc =>
            doc.posts.map(temp => {
              return (
                <div key={temp.id}>
                  <div className='row postTitle marginTop'>
                    <h2>{temp.title}</h2>
                  </div>

                  <div className='row postContent'>
                    <div className='postContent'>
                      <p>{temp.content}</p>
                    </div>
                  </div>

                  <div className='author'>
                    <p>~{doc.name}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}

export default Home
