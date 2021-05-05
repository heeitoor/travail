import { FormGroup } from '@angular/forms';

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getValuesFromForm(form: FormGroup) {
  let obj: any = {};

  for (const key in form.controls) {
    console.log(form.get(key));

    obj[key] = form.get(key)?.value;
  }

  return obj;
}
