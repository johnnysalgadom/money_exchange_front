export interface IResponseUser {
    status:     string;
    models:     IUser[];
    message:    string;
  }


  export interface IUser {
    id:         number;
    username:   string;
    password:   string;
    email:      string  | null;
    status:     boolean;
    created:    string;
    created_by: string;
    updated:    string;
    updated_by: string;
  }
  
  export const defaultUser: IUser[]= []