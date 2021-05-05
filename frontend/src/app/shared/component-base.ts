import { FormGroup } from '@angular/forms';

export abstract class ComponentBase {
  abstract form: FormGroup;
  abstract isLoading: boolean;

  get isFormValid(): boolean {
    return this.form.valid;
  }

  hasErrors(fieldName: string): boolean {
    return !!this.form.get(fieldName)?.errors;
  }

  abstract submit(): void;
}
