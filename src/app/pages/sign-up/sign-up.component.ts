import { LocalStorageService } from './../../utils/local-storage.service';
import { IUser } from './../../interfaces/IUser';
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
              private _loadingService: LoadingService,
              private _localStorageService: LocalStorageService) { }

  customErrors = {required: 'Debe aceptar los terminos y condiciones para poder registrarse'}
  countries: Array<any> = [];
  provinces: Array<any> = [];

  signUpForm = this.fb.group({
    name: ['', [Validators.maxLength(30), Validators.required]],
    last_name: ['', [Validators.maxLength(30), Validators.required]],
    mail: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.maxLength(10), Validators.required, Validators.pattern(`^[0-9]*$`)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required]],
    country: [null, [Validators.required]],
    province: [null, [Validators.required]],
    termsAndConditions: [null, [Validators.requiredTrue]]
  }, {validators: this.password});

  ngOnInit(): void {

    this._sigUpService
      .getCountries()
      .subscribe((response) => this.countries = response)

    this.signUpForm
      .get('country')?.valueChanges
      .pipe(
        tap(() => this._loadingService.show()),
        switchMap(
          (country) =>
            this._sigUpService.getProvinciasByCountry(country.id)
            .pipe(finalize(() => this._loadingService.hide()))
        )
      )
      .subscribe(
        (provinces) => this.provinces = provinces
      );

  }

  signUp(): void {

    if (this.signUpForm.invalid) { return; }

    this._loadingService.show();
    const user = this.signUpForm.getRawValue();
    user.province = user.province.description;
    user.country = user.country.description;
    delete user.termsAndConditions;
    delete user.repeatPassword;

    this._sigUpService.signUp(user).pipe(
      finalize(() => this._loadingService.hide())
    )
    .subscribe(
      response =>  {
        this._localStorageService.setStorageItem('token', response.token);
        this._router.navigate(['/tech-list']);
      }
    )

  }

  password(group: AbstractControl): any {

    const password = group.get('password');
    const repeatPassword = group.get('repeatPassword');

    if (password?.value && repeatPassword?.value && (password?.value !== repeatPassword?.value)) {
      return repeatPassword?.setErrors({passwordNotMatch: true});
    }

    repeatPassword?.setErrors({passwordNotMatch: null});

    if (repeatPassword?.touched) {
      repeatPassword?.updateValueAndValidity({onlySelf: true});
    }
  }

}
