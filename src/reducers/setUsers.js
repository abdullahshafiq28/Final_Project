const initialUsers={
    id:0,
    name: '',
    email: '',
    isLogin:'false',
    posts: [
         {
           id: 0,title:'',content:''
         }
    ],
    draftPosts:[
      {
        id: 0,title:'',content:''
      }
 ]
  }
export const setUser = ( state=initialUsers, action) => {
   switch (action.type)
   {
       case 'setId':
       {
         state.id =  action.tempId;
         return state;
       }    
       case 'setEmail':return state;
       case 'setName': return state;
       case 'setIsLogin':
       {
        state.isLogin='true';
        return state;
       }
       case 'setPost': 
       {
        state.posts.push(action.tempPost);
        return state;
       }
       case 'setDraftPost': 
       {
        state.draftPosts.push(action.tempPost);
        return state;
       }
       default: return state;
   }

}
