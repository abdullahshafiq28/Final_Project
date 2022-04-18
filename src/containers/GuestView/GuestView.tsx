import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { firebaseDatabase } from '../../FirebaseConfig';
import ConfirmationMessage from '../../components/ConfirmationMessages/ConfirmationMessage';

const GuestView = () => {
  type UserType = {
    id: string;
    name?: string;
    editPost?: string;
    isLogin?: boolean;
    posts?: temptype[];
    draftPosts?: temptype[];
  }

  const [user, setUser] = useState<UserType[]>()
  const UserCollectionRef = collection(firebaseDatabase, 'users')

  const getDocS = async () => {
    var data = await getDocs(UserCollectionRef)
    setUser(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }
  type temptype = {
    title: string;
    content: string;
    id:string;
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
        {user?.map((doc:UserType, index1:number) =>
          doc.posts?.map((temp:temptype, index2:number) => (
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

export default GuestView;
