import { LoginWithGoogle } from './../../store/auth/auth.actions';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { Register, Login } from 'src/app/store/auth/auth.actions';
import { Router } from '@angular/router';

type FormMode = 'Login' | 'Register' | 'Send Password';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public myForm: FormGroup;
  public formMode: FormMode = 'Login';

  fcEmail: FormControl = new FormControl('', [Validators.required, Validators.email]);
  fcPassword: FormControl = new FormControl('', [Validators.required, , Validators.minLength(6)]);
  fcConfirmPassword: FormControl = new FormControl('', Validators.required);

  validationMessages = {
    email: [
      { type: 'required', message: 'email is required.' },
      { type: 'email', message: 'email must be a valid email address.' },
    ],
    password: [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password must be at least 6 characters long.' },
    ],
    confirmPassword: [
      { type: 'mustMatch', message: 'confirm password must be match with password.' },
    ],
  };

  constructor(private store: Store<IAppState>, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.myForm = new FormGroup({});
    this.myForm.addControl('email', this.fcEmail);
    this.myForm.addControl('password', this.fcPassword);

    console.log('LoginPage ngOnInit');
    this.myForm.valueChanges.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  submitForm(modal, isValid: boolean) {
    if (!isValid) {
      return;
    }

    switch (this.formMode) {
      case 'Register':
        this.store.dispatch(new Register({ email: modal.email, password: modal.password }));
        break;

      case 'Login':
        this.store.dispatch(new Login({ email: modal.email, password: modal.password }));
        break;

      default:
        break;
    }
  }

  loginWithGoogle() {
    this.store.dispatch(new LoginWithGoogle());
  }

  changeFormMode(mode: FormMode) {
    this.myForm.clearValidators();
    for (const control in this.myForm.controls) {
      if (control !== 'email') {
        this.myForm.removeControl(control);
      }
    }

    switch (mode) {
      case 'Login':
        this.myForm.addControl('password', this.fcPassword);
        break;
      case 'Register':
        this.myForm.addControl('password', this.fcPassword);
        this.myForm.addControl('confirmPassword', this.fcConfirmPassword);
        this.myForm.setValidators(this.mustMatch.bind(this));
        break;

      default:
        break;
    }
    this.formMode = mode;
    this.myForm.reset();
  }

  mustMatch(formGroup: FormGroup) {
    const control = formGroup.controls['password'];
    const matchingControl = formGroup.controls['confirmPassword'];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
