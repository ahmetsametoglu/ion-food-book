import { IAppState } from './../store/app.state';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { UserService } from './user.service';
import { SetAuthStatus } from '../store/auth/auth.actions';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private store: Store<IAppState>,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  registerWithMail(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(result => {
      if (!!result) {
        result.user.sendEmailVerification();
      }
      return result;
    });
  }

  loginWithMail(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return this.firebaseAuth.auth.signInWithPopup(provider);
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }

  async initializeAuthUser() {
    this.userService.getCurrentUser().then(user => {
      if (!!user) {
        this.store.dispatch(new SetAuthStatus({ status: 'authenticated', user: user }));
      }
    });
  }

  subscribeAuthStatus() {
    return this.firebaseAuth.auth.onAuthStateChanged(firebaseUser => {
      this.ngZone.run(_ => {
        if (!firebaseUser) {
          this.userService.setLocalCurrentUser(null);
          this.store.dispatch(new SetAuthStatus({ status: 'not-authenticated' }));
          if (!this.router.url.includes('/auth')) {
            this.router.navigate(['/auth']);
          }
        } else {
          this.userService.getUser(firebaseUser.uid).then(user => {
            if (!user) {
              user = this.userService.getUserFromFirebaseModel(firebaseUser);
            }
            const checkedUser = this.userService.checkUserMissingInfo(user, firebaseUser);

            const updatedUser = checkedUser || user;
            this.userService.updateUser(updatedUser._id, updatedUser);
            this.userService.setLocalCurrentUser(updatedUser);
            this.store.dispatch(
              new SetAuthStatus({
                status: 'authenticated',
                user: updatedUser,
              })
            );

            if (this.router.url.includes('/auth')) {
              this.route.queryParams
                .pipe(first())
                .toPromise()
                .then(params => {
                  if (params.returnUrl) {
                    this.router.navigateByUrl(params.returnUrl);
                  } else {
                    this.router.navigateByUrl('/');
                  }
                });
            }
          });
        }
      });
    });
  }
}
