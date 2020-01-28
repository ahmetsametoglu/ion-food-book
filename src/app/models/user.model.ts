export interface IUser {
  _id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
  userCategory: UserCategory;
  tokens: IUserToken;
}

export interface IUserToken {
  [id: string]: {
    deviceId: string;
    token: string;
    lastValidDate: Date;
  };
}

export enum UserCategory {
  'root',
  'admin',
  'editor',
  'normal',
}
