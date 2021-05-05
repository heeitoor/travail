import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecoverComponent } from './recover/recover.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SecurityRoutingModule } from './security-routing.module';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';

@NgModule({
  declarations: [
    LoginComponent,
    RecoverComponent,
    ChangePasswordComponent,
    ActivateAccountComponent,
    CreateAccountComponent,
  ],
  imports: [CommonModule, SecurityRoutingModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LoginComponent, RecoverComponent],
})
export class SecurityModule {}
