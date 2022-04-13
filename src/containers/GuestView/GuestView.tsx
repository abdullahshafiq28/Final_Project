import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDatabase } from '../../FirebaseConfig'
import ConfirmationMessage from '../../components/ConfirmationMessages/ConfirmationMessage'

const GuestView = () => {
  const [user, setUser] = useState<any>([])
  const UserCollectionRef = collection(firebaseDatabase, 'users')

  const getDocS = async () => {
    var data = await getDocs(UserCollectionRef)
    setUser(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }

  useEffect(() => {
    getDocS()
  }, [])

  return (
    <div className='row displayProperty'>
      <div className='sideMenu'></div>
      <div className='posts'>
        <div className='row postTitle'>
          <h1>POSTS</h1>
          <ConfirmationMessage />
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

export default GuestView
