const setmyId='setId'
const setmyName='setName'
const setLogin='setIsLogin'
const setLogout='setLogout'
const setpost='setPost'
const deletepost='deletePost'
const deletedraftpost='deleteDraftPost'
const setdraftpost='setDraftPost'
const editpost='editPost'
const postid='setPostId'
const draftpostid='setdraftPostId'

export const setId = (tempId) => ({
    type: setmyId, tempId
} ) 
      
export const setName = (myName) => ({
    type: setmyName, myName 
})

export const setIsLogin = () => ({
    type: setLogin 
})

export const setIsLogout = () => ({
    type: setLogout 
})

export const setPost = (postData) => ({
    type: setpost, postData 
})

export const deletePost = (delPost) => ({
    type: deletepost, delPost 
})

export const deleteDraftPost = (delDraftPost) => ({ 
    type: deletedraftpost, delDraftPost
})

export const setDraftPost = (setdraft) => ({ 
    type: setdraftpost, setdraft 
})

export const editPost = (seteditpost) => ({ 
    type: editpost, seteditpost 
})

export const setPostId = () => ({ 
    type: postid
})

export const setdraftPostId = () => ({ 
    type: draftpostid
})