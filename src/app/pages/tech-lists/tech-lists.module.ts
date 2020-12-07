import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechListsRoutingModule } from './tech-lists-routing.module';
import { TechListsComponent } from './tech-lists.component';
import { TechListsService } from './tech-lists.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';


@NgModule({
  declarations: [
    TechListsComponent,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    TechListsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TechListsService]
})
export class TechListsModule { }
