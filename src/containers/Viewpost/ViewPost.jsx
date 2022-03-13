import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components'
import { firebaseDatabase } from '../../FirebaseConfig'

const ViewPost = () => {
  const [user, setUser] = useState([])
  const getUser = useSelector(state => state.setUser)
  const UserCollectionRef = collection(firebaseDatabase, 'users')
  const UserCollection = doc(firebaseDatabase, 'users', getUser.id)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const confirmCreatePost = () => {
    if (getUser.isLogin == true) {
      navigate('/CreatePost')
    }
  }
  const viewDraftPage = () => {
    navigate('/ViewDraft')
  }
  const viewMyPostPage = () => {
    navigate('/ViewPost')
  }

  var data
  useEffect(async () => {
    data = await getDocs(UserCollectionRef)
    data.docs.map(temp => {
      if (temp.id == getUser.id) {
        setUser({ ...temp.data(), id: temp.id })
      }
    })
  }, [])

  const deleteHandle = myHelp => {
    getUser.posts.map(temp => {
      if (temp.id == myHelp) {
        dispatch({ type: 'deletePost', tempPost: temp.id })
        setDoc(UserCollection, getUser)
        navigate('/')
      }
    })
  }
  const editHandle = myHelp => {
    getUser.posts.map(temp => {
      if (temp.id == myHelp) {
        dispatch({ type: 'deletePost', tempPost: temp.id })
        dispatch({ type: 'editPost', tempPost: temp })
        navigate('/EditPost')
      }
    })
  }
  return (
      <div className='row displayProperty'>
        <div className='sideMenu'>
          <Button
            title={'Create Post'}
            onClick={confirmCreatePost}
            styling={{ container: 'menuStyle', button: 'menuButtonStyle' }}
          />
          <Button
            title={' View Post'}
            onClick={viewMyPostPage}
            styling={{ container: 'menuStyle', button: 'menuButtonStyle' }}
          />
          <Button
            title={' View Draft'}
            onClick={viewDraftPage}
            styling={{ container: 'menuStyle', button: 'menuButtonStyle' }}
          />
        </div>
        <div className='posts'>
          <div className='row postTitle'>
            <h1>MY POSTS</h1>
          </div>
          {user?.posts?.map(temp => (
            <div key={temp.id}>
              <div className='row postTitle marginTop '>
                <h2>{temp.title}</h2>
              </div>
              <div className='marginPropertyLeft'>
                <button
                  className='loginbutton'
                  onClick={() => {
                    deleteHandle(temp.id)
                  }}
                >
                  {' '}
                  Delete
                </button>
                <button
                  className='editbutton'
                  onClick={() => {
                    editHandle(temp.id)
                  }}
                >
                  {' '}
                  Edit
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
              <div className='stylecenter'> 
                <hr className='line'/>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}
export default ViewPost
