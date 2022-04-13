const initialUsers = {
  id: 0,
  name: '',
  editPost: '',
  isLogin: false,
  posts: [],
  draftPosts: []
}
const setId='setId'
const setName='setName'
const setIsLogin='setIsLogin'
const setLogout='setLogout'
const setPost='setPost'
const deletePost='deletePost'
const deleteDraftPost='deleteDraftPost'
const setDraftPost='setDraftPost'
const editPost='editPost'

export const setUser = ( state=initialUsers, action) => {
  switch (action.type) {
    case setId: {

      return {
        ...state,
        id : action.tempId
      }
    }

    case setName: {

      return {
        ...state,
        name : action.myName
      }
    }

    
    case setIsLogin: {

      return {
        ...state,
        isLogin : true
      } 
    }
    case setLogout: {

      return {
        ...state,
        isLogin : false
      } 
    }
    case setPost: {

      return {
        ...state,
        posts : [...state.posts, action.postData]
      } 
    }

    case deletePost: {

      return {
        ...state,
        posts : state.posts.filter(temp => temp.id != action.delPost)
      } 
    }

    case deleteDraftPost: {

      return {
        ...state,
        draftPosts : state.draftPosts.filter(temp => temp.id != action.delDraftPost)
      } 
    }

    case setDraftPost: {

      return {
        ...state,
        draftPosts : [...state.draftPosts, action.setdraft]
      } 
    }

    case editPost: {

      return {
        ...state,
        editPost : action.seteditpost
      } 
    }

    default: return state
  }
}
