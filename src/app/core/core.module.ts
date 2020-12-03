import { LoadingComponent } from './../utils/loading/loading.component';
import { CoreComponent } from './core.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ]
})
export class CoreModule { }
