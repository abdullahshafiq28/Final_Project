const initialValue = {
    postId: 0,
    draftPostId: 0
  }
  const postid='setPostId'
  const draftpostId='setdraftPostId'
  
  export const manageIds = ( state=initialValue, action) => {
    switch (action.type) {
      case postid: {
        return {
          ...state,
          postId : state.postId + 1
        }
      }

      case draftpostId: {
        return{
          ...state,
         draftPostId : state.draftPostId + 1
        }
      }

      default: return state
    }
  }
  