import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ControlErrorComponent } from './utils/forms/control-error/control-error.component';
import { ControlErrorContainerDirective } from './utils/forms/form-control-error-container.directive';
import { ControlErrorsDirective } from './utils/forms/form-control-error.directive';
import { FormSubmitDirective } from './utils/forms/form-submit.directive';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
