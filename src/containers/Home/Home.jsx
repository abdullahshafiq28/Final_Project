import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { firebaseDatabase } from '../../FirebaseConfig'
import { Button } from '../../components'

const Home = () => {
  const [user, setUser] = useState([])
  const UserCollectionRef = collection(firebaseDatabase, 'users')
  const getUser = useSelector(state => state.setUser)
  const navigate = useNavigate()

  const viewCreatePost = () => {
    if (getUser.isLogin == true) {
      navigate('/CreatePost')
    }
  }
  const viewDraftPage = () => {
    if (getUser.isLogin == true) {
      navigate('/ViewDraft')
    }
  }
  const viewMyPostPage = () => {
    if (getUser.isLogin == true) {
      navigate('/ViewPost')
    }
  }

  var data
  useEffect(async () => {
    data = await getDocs(UserCollectionRef)
    setUser(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }, [])
console.log('ok',getUser)
  return (
    <div className='row displayProperty'>
      <div className='sideMenu'>
        <Button
          title={'Create Post'}
          onClick={viewCreatePost}
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
          <h1>POSTS</h1>
        </div>
        {user?.map(doc =>
          doc.posts.map(temp => (
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
              <div className='stylecenter'> 
                <hr className='line'/>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
