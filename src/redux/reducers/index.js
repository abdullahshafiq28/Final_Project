import {setUser } from './setUsers'
import { manageIds } from './manageId'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  setUser: setUser,
  manageIds: manageIds
})

export default rootReducer
