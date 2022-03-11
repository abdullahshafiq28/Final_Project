import {setUser }from './setUsers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    setUser: setUser
   

})

export default rootReducer;