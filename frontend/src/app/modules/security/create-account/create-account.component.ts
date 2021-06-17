import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';

import { Router } from '@angular/router';
import { ComponentBase } from 'src/app/shared/component-base';
import { CreateComponentState, CreateModel } from '../models';

import { WorkTypeService } from 'src/app/services/work-type.service';
import { SelectListItem, UserType } from 'src/app/shared/models';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent extends ComponentBase implements OnInit {
  form = new FormGroup({
    userType: new FormControl(1, [Validators.required]),
    userTypeIndex: new FormControl(0, [Validators.required]),
    email: new FormControl('heitor22@travail.com', [Validators.email, Validators.required]),
    name: new FormControl('teste', [Validators.required]),
    workType: new FormControl('', []),
    workTypeId: new FormControl('', []),
  });
  isLoading = false;
  isWorkTypeLoading = false;
  workTypes: SelectListItem[] = [];
  workTypes$ = new Observable<SelectListItem[]>();
  workTypeInput$ = new Subject<string>();
  state = CreateComponentState.SHOW_FORM;
  userTypeList = [
    {
      id: 1,
      type: 'CUSTOMER',
      description: 'Estou procurando um serviço',
    },
    {
      id: 2,
      type: 'PROFESIONAL',
      description: 'Sou empresa prestadora de serviço',
    },
    {
      id: 3,
      type: 'COMPANY',
      description: 'Sou autônomo(a) prestador(a) de serviço',
    },
  ];

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

  ngOnInit(): void {
    this.loadWorkTypes();
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

  trackByFn(item: SelectListItem) {
    return item.id;
  }

  private loadWorkTypes() {
    console.log(12);
    
    this.workTypes$ = concat(
      of([]),
      this.workTypeInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.isWorkTypeLoading = true)),
        switchMap((term) =>
          this.workTypeService.getForSelect(term).pipe(
            catchError(() => of([])),
            tap(() => (this.isWorkTypeLoading = false))
          )
        )
      )
    );
  }
}
