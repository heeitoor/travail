import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
})
export class RecoverComponent implements OnInit {
  recoverForm = this.formBuilder.group({
    email: new FormControl('heitordesousa@gmail.com', [Validators.required]),
  });

  constructor(private readonly formBuilder: FormBuilder, private readonly securityService: SecurityService) {}

  get isFormValid(): boolean {
    return this.recoverForm.valid;
  }

  ngOnInit(): void {}

  hasErrors(fieldName: string): boolean {
    return !!this.recoverForm.get(fieldName)?.errors;
  }

  submit() {
    // if (this.isFormValid) {
    //   this.securityService
    //     .login({
    //       email: this.loginForm.get('email')?.value,
    //       password: this.loginForm.get('password')?.value,
    //     })
    //     .subscribe((userName) => {
    //       this.snackbarService.open(
    //         `Bem vindo novamente, ${userName}`,
    //         'Fechar',
    //         {
    //           verticalPosition: 'top',
    //         }
    //       );
    //     });
    // } else {
    //   this.snackbarService.open('O formulário possui erros', 'Fechar', {
    //     verticalPosition: 'top',
    //   });
    // }
  }
}
