const initialValue = {
    postId: 0,
    draftPostId: 0
  }
  
  export const setHelp = ( state=initialValue, action) => {
    switch (action.type) {
      case 'setPostId': {
        state.postId = state.postId+1
  
        return state
      }
  
      case 'setdraftPostId': {
       state.draftPostId = state.draftPostId+1
  
       return state
      }

      default: return state
    }
  }
  