import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { confirmAlert } from 'react-confirm-alert';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components';
import { firebaseDatabase } from '../../FirebaseConfig';
import { editPost, deletePost } from '../../redux/actions';
import { RootState } from 'redux/store';

import 'react-confirm-alert/src/react-confirm-alert.css';

const ViewPost = () => {
  const [user, setUser] = useState<UserType>()
  const userData = useSelector((state:RootState) => state.setUser)
  const UserCollectionRef = collection(firebaseDatabase, 'users')
  const UserCollection = doc(firebaseDatabase, 'users', userData.id)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleUserDoc = async () => {
    setDoc(UserCollection, userData)
    var data = await getDocs(UserCollectionRef)
    data.docs.map(temp => {
      if (temp.id == userData.id) {
        setUser({ ...temp.data(), id: temp.id })
      }
    })
  }

  useEffect(() => {
    handleUserDoc()
  }, [userData])

  const submit = (myHelp:number) => {
    confirmAlert({
      title: 'Delete Post !!',
      message: 'Are you sure to delete this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(myHelp)
        },
        {
          label: 'No',
          onClick: () => navigate('/ViewPost')
        }
      ]
    })
  }
  type temptype = {
    title: string;
    content: string;
    id:number;
  }
  type UserType = {
    id: string;
    name?: string;
    editPost?: string;
    isLogin?: boolean;
    posts?: temptype[];
    draftPosts?: temptype[];
  }
  const handleDelete = (myHelp:number) => {
    userData.posts.map((temp:temptype) => {
      if (temp.id == myHelp) {
        dispatch(deletePost(temp.id))
      }
    })
  }
  const handleEdit = (myHelp:number) => {
    userData.posts.map((temp:temptype) => {
      if (temp.id == myHelp) {
        dispatch(deletePost(temp.id))
        dispatch(editPost(temp))
        navigate('/EditPost')
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
          onClick={() => {
            navigate('/ViewDraft')
          }}
          styling={{ container: 'menuStyle', button: 'menuButtonStyle' }}
        />
      </div>
      <div className='posts'>
        <div className='row postTitle'>
          <h1>MY POSTS</h1>
        </div>
        {user?.posts?.map((temp:temptype) => (
          <div key={temp.id.toString()}>
            <div className='row postTitle marginTop '>
              <h2>{temp.title}</h2>
            </div>
            <div className='marginPropertyLeft'>
              <button
                className='loginbutton'
                onClick={() => {
                  submit(temp.id)
                }}
              >
                {' '}
                Delete
              </button>
              <button
                className='editbutton'
                onClick={() => {
                  handleEdit(temp.id)
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
              <hr className='line' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewPost;
