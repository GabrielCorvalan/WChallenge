import { CoreComponent } from './core.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ]
})
export class CoreModule { }
