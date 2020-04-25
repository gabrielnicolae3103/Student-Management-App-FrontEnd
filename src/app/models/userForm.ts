import {UserType} from 'src/app/models/userType'
export interface UserForm {
    id: number,
    login: string,
    password: string,
    userType: UserType,
    firstName: string;
    lastName: string,
    email: string,
    phoneNumber: number;
  }
