
import { AnyAction } from 'redux';
import { Reducer } from 'redux';


const initialUsers = {
  id: '',
  name: '',
  editPost: { id:0, title:'',content:''},
  isLogin: false,
  posts: [],
  draftPosts: []
};
const setId='setId';
const setName='setName';
const setIsLogin='setIsLogin';
const setLogout='setLogout';
const setPost='setPost';
const deletePost='deletePost';
const deleteDraftPost='deleteDraftPost';
const setDraftPost='setDraftPost';
const editPost='editPost';

type temp = {
  id: number;
  title: string;
  content:string;
}

type initialUsersType = {
  id: string,
  name: string,
  editPost: { id: number, title:string, content:string},
  isLogin: boolean,
  posts: temp[],
  draftPosts: temp[]
}

export const setUser: Reducer<initialUsersType,AnyAction> = ( state=initialUsers, action) => {
  switch (action.type) {
    case setId: {

      return {
        ...state,
        id : action.tempId
      };
    }

    case setName: {

      return {
        ...state,
        name : action.myName
      };
    }

    
    case setIsLogin: {

      return {
        ...state,
        isLogin : true
      };
    }
    case setLogout: {

      return {
        ...state,
        isLogin : false
      };
    }
    case setPost: {

      return {
        ...state,
        posts : [...state.posts, action.postData]
      };
    }

    case deletePost: {

      return {
        ...state,
        posts : state.posts.filter(temp => temp.id != action.delPost)
      };
    }

    case deleteDraftPost: {

      return {
        ...state,
        draftPosts : state.draftPosts.filter(temp => temp.id != action.delDraftPost)
      };
    }

    case setDraftPost: {

      return {
        ...state,
        draftPosts : [...state.draftPosts, action.setdraft]
      }; 
    }

    case editPost: {

      return {
        ...state,
        editPost : action.seteditpost
      }; 
    }

    default: return state;
  }
};
