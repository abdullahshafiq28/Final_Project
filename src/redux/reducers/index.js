import {setUser } from './setUsers'
import { setHelp } from './help'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  setUser: setUser,
  setHelp: setHelp
})

export default rootReducer
