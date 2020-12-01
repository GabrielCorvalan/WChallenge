import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private _sigUpService: SignUpService,
              private _router: Router) { }

  countries: Array<any> = [];
  provinces: Array<any> = [];

  signUpForm = this.fb.group({
    nombre: ['', [Validators.maxLength(30), Validators.required]],
    apellido: ['', [Validators.maxLength(30), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    telefono: ['', [Validators.maxLength(10), Validators.required]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
    idCountry: ['']
  }, {validators: this.password});

  ngOnInit(): void {
    this.countries = this._sigUpService.getCountries();

    this.signUpForm
      .get('idCountry')?.valueChanges
      .subscribe((country) => {
        this.provinces = this._sigUpService.getProvinciasByCountry(country);
      });

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
