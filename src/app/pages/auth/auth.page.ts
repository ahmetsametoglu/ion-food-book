import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

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
