import { InputValidationErrorComponent } from './../../components/input-validation-error/input-validation-error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, AuthPageRoutingModule],
  declarations: [AuthPage, InputValidationErrorComponent],
})
export class AuthPageModule {}
