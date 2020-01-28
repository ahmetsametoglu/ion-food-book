import { IAppState } from './../store/app.state';
import { IUser, UserCategory } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private store: Store<IAppState>,
    private storage: Storage,
    private db: AngularFirestore
  ) {}

  getUserFromFirebaseModel(firebaseUser: firebase.User): IUser {
    return {
      _id: firebaseUser.uid,
      username: !!firebaseUser.displayName
        ? firebaseUser.displayName
        : (firebaseUser.email as string).split('@')[0],
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      photoURL: firebaseUser.photoURL,
      userCategory: UserCategory.normal,
      tokens: null,
    };
  }

  async getUser(userId: string): Promise<IUser> {
    const userDoc$ = await this.db
      .doc<IUser>(`/users/${userId}`)
      .get()
      .pipe(take(1));

    return userDoc$.toPromise().then(doc => {
      return doc.data() as IUser;
    });
  }

  async updateUser(userId: string, user: IUser) {
    return this.db.doc<IUser>(`/users/${userId}`).set({ ...user });
  }

  setLocalCurrentUser(user: IUser) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.storage.set('currentUser', user);
  }

  getCurrentUser(): Promise<IUser> {
    return new Promise(async resolve => {
      const user =
        (await this.store
          .select('auth')
          .pipe(
            take(1),
            map(state => {
              return state.authUser;
            })
          )
          .toPromise()) || (JSON.parse(localStorage.getItem('currentUser')) as IUser);
      if (!!user) {
        resolve(user);
      } else {
        this.storage.get('currentUser').then(user => {
          resolve(user);
        });
      }
    });
  }

  checkUserMissingInfo(dbUser: IUser, firebaseUser: firebase.User): IUser {
    if (!dbUser || !firebaseUser) {
      return null;
    }

    let isUserUpdate = false;
    let user: IUser = { ...dbUser };

    if (user.emailVerified !== firebaseUser.emailVerified) {
      user.emailVerified = firebaseUser.emailVerified;
      isUserUpdate = true;
    }

    if (!user.photoURL && !!firebaseUser.photoURL) {
      user.photoURL = firebaseUser.photoURL;
      isUserUpdate = true;
    }

    if (!user.username && !!firebaseUser.displayName) {
      user.username = firebaseUser.displayName;
      isUserUpdate = true;
    }

    return isUserUpdate ? user : null;
  }
}
