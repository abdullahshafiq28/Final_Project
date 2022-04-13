import { confirmAlert } from 'react-confirm-alert'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components'
import { firebaseDatabase } from '../../FirebaseConfig'
import { deleteDraftPost, setPost } from '../../redux/actions'

import 'react-confirm-alert/src/react-confirm-alert.css'

const ViewDraft = () => {
  const [user, setUser] = useState<any>([])
  const userData = useSelector((state:any) => state.setUser)
  const UserCollectionRef = collection(firebaseDatabase, 'users')
  const UserCollection = doc(firebaseDatabase, 'users', userData.id)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getDocS = async () => {
    var data = await getDocs(UserCollectionRef)
    data.docs.map(temp => {
      if (temp.id == userData.id) {
        setUser({ ...temp.data(), id: temp.id })
      }
    })
  }

  useEffect(() => {
    getDocS()
  }, [])

  const submit = () => {
    confirmAlert({
      title: 'Your Post is Successfully Published !',
      buttons: [
        {
          label: 'Ok',
          onClick: () => navigate('/Home')
        }
      ]
    })
  }

  const editDeleteHandle = (myHelp:string) => {
    userData.draftPosts.map((temp:any) => {
      if (temp.id == myHelp) {
        dispatch(deleteDraftPost(temp.id))
        dispatch(setPost(temp))
        setDoc(UserCollection, userData)
        submit()
      }
    })
  }
  return (
    <div className='row displayProperty'>
      <div className='sideMenu'>
        <Button
          title={'Create Post'}
          onClick={() => {
            if (userData.isLogin == true) {
              navigate('/CreatePost')
            }
          }}
          styling={{ container: 'menuStyle', button: 'menuButtonStyle' }}
        />
        <Button
          title={' View Post'}
          onClick={() => {
            navigate('/ViewPost')
          }}
          styling={{ container: 'menuStyle', button: 'menuButtonStyle' }}
        />
        <Button
          title={' View Draft'}
          onClick={() => navigate('/ViewDraft')}
          styling={{ container: 'menuStyle', button: 'menuButtonStyle' }}
        />
      </div>
      <div className='posts'>
        <div className='row postTitle'>
          <h1>Draft POSTS</h1>
        </div>
        {user?.draftPosts?.map((temp:any, index:any) => (
          <div key={index.toString()}>
            <div className='row postTitle marginTop'>
              <h2>{temp.title}</h2>
            </div>
            <div className='marginPropertyLeft'>
              <button
                className='loginbutton'
                onClick={() => {
                  editDeleteHandle(temp.id)
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewDraft
