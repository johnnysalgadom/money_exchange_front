import {IUser} from "./user-interface";

export interface IAuth {
  success: boolean;
  access_token: string;
  refresh_token: string;
  data: IUser;
  message: string;
}

