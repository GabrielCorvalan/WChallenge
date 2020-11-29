import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechListsRoutingModule } from './tech-lists-routing.module';
import { TechListsComponent } from './tech-lists.component';
import { TechListsService } from './tech-lists.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [TechListsComponent],
  imports: [
    CommonModule,
    TechListsRoutingModule,
    HttpClientModule
  ],
  providers: [TechListsService]
})
export class TechListsModule { }
