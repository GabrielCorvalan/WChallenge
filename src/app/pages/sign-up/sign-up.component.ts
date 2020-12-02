import { LoadingService } from './../../utils/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private _sigUpService: SignUpService,
              private _router: Router,
              private _loadingService: LoadingService) { }

  customErrors = {required: 'Debe aceptar los terminos y condiciones para poder registrarse'}
  countries = this._sigUpService.getCountries();
  provinces: Array<any> = [];

  signUpForm = this.fb.group({
    nombre: ['', [Validators.maxLength(30), Validators.required]],
    apellido: ['', [Validators.maxLength(30), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    telefono: ['', [Validators.maxLength(10), Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required]],
    country: [''],
    province: [''],
    termsAndConditions: [null, [Validators.requiredTrue]]
  }, {validators: this.password});

  ngOnInit(): void {

    this.signUpForm
      .get('country')?.valueChanges
      .pipe(
        tap(() => this._loadingService.show()),
        switchMap(
          (country) =>
            this._sigUpService.getProvinciasByCountry(country)
            .pipe(finalize(() => this._loadingService.hide()))
        )
      )
      .subscribe(
        (provinces) => this.provinces = provinces
      );

  }

  submit(): void {

    if (this.signUpForm.invalid) return;

    console.log(this.signUpForm.getRawValue());

    this._router.navigate(['/tech-list']);
  }

  password(group: AbstractControl): any {

    const password = group.get('password');
    const repeatPassword = group.get('repeatPassword');

    if (password?.value && repeatPassword?.value && (password?.value !== repeatPassword?.value)) {
      return group.get('repeatPassword')?.setErrors({passwordNotMatch: true});
    }

    return group.get('repeatPassword')?.setErrors(null);
  }

}
