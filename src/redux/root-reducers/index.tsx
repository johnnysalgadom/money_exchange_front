import { combineReducers } from 'redux'
import authReducer from "../auth-reducer/auth-reducer";
import {LOGOUT} from "../../constants/constants";

const appReducer = combineReducers({
  auth: authReducer,
})

const rootReducer = (state: any, action: any) => {
  if(action.type === LOGOUT){
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer

export type RootReducer = ReturnType<typeof rootReducer>
