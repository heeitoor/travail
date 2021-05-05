import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-progress-bar';
import { Router } from '@angular/router';
import { ComponentBase } from 'src/app/shared/component-base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends ComponentBase implements OnInit {
  form = new FormGroup({
    email: new FormControl('heitor@travail.com', [Validators.email, Validators.required]),
    password: new FormControl('senha', [Validators.required]),
  });

  isLoading = false;

  constructor(private readonly securityService: SecurityService, private readonly router: Router) {
    super();
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }

  ngOnInit(): void {}

  hasErrors(fieldName: string): boolean {
    return !!this.form.get(fieldName)?.errors;
  }

  submit() {
    this.isLoading = true;

    if (this.isFormValid) {
      this.securityService
        .login({
          email: this.form.get('email')?.value,
          password: this.form.get('password')?.value,
        })
        .subscribe((userName) => {
          this.router.navigate(['/home']);
        });
    } else {
    }
  }
}
