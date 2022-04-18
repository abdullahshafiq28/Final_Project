import {setUser } from './setUsers'
import { manageIds } from './manageId'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  manageIds: manageIds,
  setUser:setUser
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>;


