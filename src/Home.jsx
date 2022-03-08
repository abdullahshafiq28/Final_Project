import Taskbar from './Taskbar'
import { useNavigate } from 'react-router-dom'
//import { onValue, ref, getDatabase } from 'firebase/database'
// import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const navigate = useNavigate()
  const confirm = () => {
    console.log('isLOgin')
    if (getUser.isLogin == 'true') {
      navigate('/CreatePost')
      console.log(getUser.isLogin)
    }
  }
  const ViewDraftPage = () => {
    navigate('/ViewDraft')
  }
  // const [myContent, setMyContent] = useState({
  //   title: [],
  //   content: []
  // })

  const getUser = useSelector(state => state.setUser)
  console.log(getuser)
  //useEffect(() => {
  // const db = getDatabase()
  // const getPostContent = ref(db, 'users/' + 21 + '/draftPosts/postContent')
  // var contentData = []
  // onValue(getPostContent, snapshot => {
  //   contentData = snapshot.val()
  // setMyContent({
  //   content: [data]
  // })
  // })
  // const getPostTitle = ref(db, 'users/' + 21 + '/draftPosts/postsTitle')
  // onValue(getPostTitle, snapshot => {
  //   const data = snapshot.val()
  //   // console.log('post title')
  //   // console.log(data)
  //   setMyContent({
  //     title: [data],
  //     content: [contentData]
  //   })
  // })
  // console.log('complete post')
  // console.log(myContent)
  //}, [])

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
            <button className='menuButtonStyle'> View Post</button>
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
          {/* {myContent.title.map(temp => {
            console.log(temp)
            return (
              <>
                <div className='row postTitle'>
                  <h1>Post Title</h1>
                </div>
                <div className='row postTitle'>
                  <h3>{temp.title}</h3>
                </div>
                <div className='row postContent'>
                  <h1>Post Content</h1>
                </div>
                <div className='row postContent'>
                  <h3>{temp.content}</h3>
                </div>
              </>
            )
          })} */}
        </div>
      </div>
    </>
  )
}

export default Home
