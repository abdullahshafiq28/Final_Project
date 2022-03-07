const initialUsers={
    id:0,
    name: '',
    email: '',
    posts: {
      postsTitle: [],
      postContent: []
    },
    draftPosts:{
        postsTitle: [],
        postContent: []
      }
  }


export const setUser = ( state=initialUsers, action) => {
   switch (action.type)
   {
       case 'setId':
       {
         state.id =  action.tempId;
         return state;
       }    
       case "setEmail":return state;
       case "setName": return state;
       case 'setPostTitle': 
       {
        state.posts.postsTitle.push(action.tempTitle);
        return state;
       }
       case 'setPostContent': 
       {
        state.posts.postContent.push(action.tempContent);
        return state;
       }
       case 'setDraftPostTitle': 
       {
        state.draftPosts.postsTitle.push(action.tempTitle);
        return state;
       }
       case 'setDraftPostContent': 
       {
        state.draftPosts.postContent.push(action.tempContent);
        return state;
       }
       default: return state;
   }

}
