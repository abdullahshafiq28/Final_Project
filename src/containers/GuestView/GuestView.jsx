import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDatabase } from '../../FirebaseConfig'

const GuestView = () => {
  const [user, setUser] = useState([])
  const UserCollectionRef = collection(firebaseDatabase, 'users')

  
  useEffect(async () => {
    var data = await getDocs(UserCollectionRef)
    setUser(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }, [])
  return (
    <div className='row displayProperty'>
       <div className='sideMenu'>
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

export default GuestView
