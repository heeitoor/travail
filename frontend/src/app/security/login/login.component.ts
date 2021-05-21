import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: new FormControl('heitordesousa@gmail.com', [Validators.required]),
    password: new FormControl('string', [Validators.required]),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly snackbarService: MatSnackBar,
    private readonly securityService: SecurityService
  ) {}

  get isFormValid(): boolean {
    return this.loginForm.valid;
  }

  ngOnInit(): void {
    this.securityService.gets()
  }

  hasErrors(fieldName: string): boolean {
    return !!this.loginForm.get(fieldName)?.errors;
  }

  submit() {
    if (this.isFormValid) {
      this.securityService
        .login({
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value,
        })
        .subscribe((userName) => {
          this.snackbarService.open(
            `Bem vindo novamente, ${userName}`,
            'Fechar',
            {
              verticalPosition: 'top',
            }
          );
        });
    } else {
      this.snackbarService.open('O formulário possui erros', 'Fechar', {
        verticalPosition: 'top',
      });
    }
  }
}
