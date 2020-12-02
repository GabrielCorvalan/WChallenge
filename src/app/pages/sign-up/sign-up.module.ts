import { LoadingService } from './../../utils/loading/loading.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from 'src/app/utils/forms/control-error/control-error.component';
import { ControlErrorContainerDirective } from 'src/app/utils/forms/form-control-error-container.directive';
import { ControlErrorsDirective } from 'src/app/utils/forms/form-control-error.directive';
import { FormSubmitDirective } from 'src/app/utils/forms/form-submit.directive';



@NgModule({
  declarations: [
    SignUpComponent,
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective,
    ControlErrorComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [ControlErrorComponent],
  bootstrap: [LoadingService]
})
export class SignUpModule { }
