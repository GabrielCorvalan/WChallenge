import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  required: () => `Este campo es requerido`,
  'Mask error': () => `Complete el campo correctamente`,
  minlength: ({ requiredLength, actualLength }: any) => `Debe haber ${requiredLength} caracteres, hay ${actualLength}`,
  maxlength: ({ requiredLength, actualLength }: any) => `Debe haber ${requiredLength} caracteres, hay ${actualLength}`,
  passwordNotMatch: () => `Las contraseñas no coinciden`,
  email: () => `Ingrese un correo electronico válido`,
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});


