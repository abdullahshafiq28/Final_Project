import Taskbar from './Taskbar'
const ViewDraft = () => {
  return (
    <>
      <Taskbar />
      <div className='row displayProperty'>
        <div className='sideMenu'>
          <div className='menuStyle'>
            <button className='menuButtonStyle'>Create Post</button>
          </div>
          <div className='menuStyle'>
            <button className='menuButtonStyle'> View Post</button>
          </div>
          <div className='menuStyle'>
            <button className='menuButtonStyle'> View Draft</button>
          </div>
        </div>

        <div className='posts'>
          <div className='row postTitle'>
            <h1>Draft POSTS</h1>
          </div>
          {/* {myContent.map(temp => {
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

export default ViewDraft
