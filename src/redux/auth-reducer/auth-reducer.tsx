import {IUser} from "../../interfaces/auth-interface";
import {LOGIN} from "../../constants/constants";

export interface IActionAuth {
  type: string
  payload: IAuthState
}

export interface IAuthState {
  isLoggedIn: boolean
  username: string
  accessToken: string
}

const initialAuthState: IAuthState = {
  isLoggedIn: false,
  username: '',
  accessToken: '',
}

const authReducer = (state = initialAuthState, action: IActionAuth): IAuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        accessToken: action.payload.accessToken,
      }
    default:
      return state
  }
}

export default authReducer