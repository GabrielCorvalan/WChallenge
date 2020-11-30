import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    email: ['', [Validators.email]],
    telefono: ['', [Validators.maxLength(10)]],
    password: [''],
    repeatPassword: [''],
    idCountry: ['', Validators.required]
  });

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


}
