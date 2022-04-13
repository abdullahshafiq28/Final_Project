import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { firebaseDatabase } from '../../FirebaseConfig'
import { Button } from '../../components'

const Home = () => {
  const [user, setUser] = useState<any>([])
  const UserCollectionRef = collection(firebaseDatabase, 'users')
  const navigate = useNavigate()

  const getUserDocs = async () => {
    var data = await getDocs(UserCollectionRef)
    setUser(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }

  useEffect(() => {
    getUserDocs()
  }, [])

  return (
    <div className='row displayProperty'>
      <div className='sideMenu'>
        <Button
          title={'Create Post'}
          onClick={() => {
            navigate('/CreatePost')
          }}
          styling={{ container: 'menuStyle', button: 'menuButtonStyle' }}
        />
        <Button
          title={' My Posts'}
          onClick={() => {
            navigate('/ViewPost')
          }}
          styling={{ container: 'menuStyle', button: 'menuButtonStyle' }}
        />
        <Button
          title={' View Draft'}
          onClick={() => {
            navigate('/ViewDraft')
          }}
          styling={{ container: 'menuStyle', button: 'menuButtonStyle' }}
        />
      </div>
      <div className='posts'>
        <div className='row postTitle'>
          <h1>POSTS</h1>
        </div>
        {user?.map((doc:any, index1:string) =>
          doc.posts.map((temp:any, index2:string) => (
            <div key={(index1 + index2).toString()}>
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
                <hr className='line' />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
