const initialUsers = {
  id: 0,
  name: '',
  editPost: '',
  isLogin: false,
  posts: [],
  draftPosts: []
}

export const setUser = ( state=initialUsers, action) => {
  switch (action.type) {
    case 'setId': {
      state.id = action.tempId

      return state
    }

    case 'setName': {
     state.name = action.myName

     return state
    }

    case 'setIsLogin': {
      state.isLogin = true

      return state
    }
    case 'setPost': {
      state.posts.push(action.tempPost)

      return state
    }

    case 'deletePost': {
      state.posts = state.posts.filter(temp => temp.id != action.tempPost)

      return state
    }

    case 'deleteDraftPost': {
      state.draftPosts = state.draftPosts.filter(temp => temp.id != action.tempPost)

      return state
    }

    case 'setDraftPost': {
      state.draftPosts.push(action.tempPost)

      return state
    }

    case 'editPost': {
      state.editPost = action.tempPost

      return state
    }

    default: return state
  }
}
