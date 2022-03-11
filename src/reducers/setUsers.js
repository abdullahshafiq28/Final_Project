const initialUsers={
    id:0,
    name: '',
    isLogin:'false',
    posts: [
        
    ],
    draftPosts:[
     
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
       case 'setName': 
       {
         state.name= action.myName;
         return state;
       }
      
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
       case 'deletePost':
       {
         var tempArray=[]
        state.posts.map(temp => {
          if (temp.id == action.tempPost) {
            // console.log('skip')
            // console.log(temp)
          }
          else{
            tempArray.push(temp)
          }
         
        })
        console.log('lets see', tempArray)
        state.posts=tempArray
        return state;
       }
       case 'deleteDraftPost':
        {
          var tempArr=[]
         state.draftPosts.map(temp => {
           if (temp.id == action.tempPost) {
             // console.log('skip')
             // console.log(temp)
           }
           else{
             tempArr.push(temp)
           }
          
         })
         console.log('lets see', tempArr)
         state.draftPosts=tempArr
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
