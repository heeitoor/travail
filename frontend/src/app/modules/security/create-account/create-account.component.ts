import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';

import { Router } from '@angular/router';
import { ComponentBase } from 'src/app/shared/component-base';
import { CreateComponentState, CreateModel } from '../models';

import { ListBoxElement } from '@vaadin/vaadin-list-box/vaadin-list-box';
import { WorkTypeService } from 'src/app/services/work-type.service';
import { SelectListItem, UserType } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent extends ComponentBase implements OnInit {
  form = new FormGroup({
    userType: new FormControl('CUSTOMER', [Validators.required]),
    userTypeIndex: new FormControl(0, [Validators.required]),
    email: new FormControl('heitor22@travail.com', [Validators.email, Validators.required]),
    name: new FormControl('teste', [Validators.required]),
    workType: new FormControl('', []),
    workTypeId: new FormControl('', []),
  });
  isLoading = false;
  workTypes$ = new Observable<SelectListItem[]>();
  state = CreateComponentState.SHOW_FORM;

  get workTypeIdControl(): AbstractControl | null {
    return this.form.get('workTypeId');
  }

  get userTypeIndexControl(): AbstractControl | null {
    return this.form.get('userTypeIndex');
  }

  get userTypeControl(): AbstractControl | null {
    return this.form.get('userType');
  }

  get workTypeControl(): AbstractControl | null {
    return this.form.get('workType');
  }

  get workTypeId(): number {
    return this.workTypeIdControl?.value;
  }

  get userTypeIndex(): number {
    return this.userTypeIndexControl?.value;
  }

  get workType(): string {
    return this.workTypeControl?.value;
  }

  get userType(): UserType {
    switch (this.userTypeIndex) {
      case 1:
        return UserType.PROFESSIONAL;
      case 2:
        return UserType.COMPANY;
      default:
        return UserType.CUSTOMER;
    }
  }

  get email(): string {
    return this.form.get('email')?.value;
  }

  get name(): string {
    return this.form.get('name')?.value;
  }

  constructor(
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly workTypeService: WorkTypeService,
    private readonly securityService: SecurityService
  ) {
    super();
  }

  selectionChanged(event: CustomEvent, elementName?: string): void {
    const selectedValue = event.detail.value;

    if (elementName === 'userTypeIndex') {
      this.userTypeIndexControl?.setValue(selectedValue);
      if (event.detail.value > 0) {
        this.workTypes$ = this.workTypeService.getForSelect();
      }
    } else {
      this.workTypeIdControl?.setValue(selectedValue);
    }
  }

  ngOnInit(): void {}

  keyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.isLoading = true;
      this.workTypeIdControl?.setValue('');
      this.workTypes$ = this.workTypeService.getForSelect(this.workType).pipe(tap(() => (this.isLoading = false)));
    }
  }

  submit(): void {
    const model: CreateModel = {
      name: this.name,
      email: this.email,
      type: this.userType,
      workTypeId: this.workTypeId,
    };

    if (this.isFormValid) {
      this.isLoading = true;
      this.securityService.signup(model).subscribe(() => {
        this.isLoading = false;
        this.state = CreateComponentState.SUCCESS_INVITED;
      });
    } else {
      this.toastr.warning('O formulário possui erros', undefined, {
        positionClass: 'toast-bottom-center',
        timeOut: 5000,
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
