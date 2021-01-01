import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface FormConfig {
  formGroup: FormGroup;
}

export function formGroup(fb: FormBuilder, formData): FormGroup {
  return fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    username: ['', []],
    name: ['', []],
  });
}

export function loginConfig(fb: FormBuilder, formData): FormConfig {
  return {
    formGroup: formGroup(fb, formData)
  };
}
