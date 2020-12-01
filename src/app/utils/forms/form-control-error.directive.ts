import { Directive, Optional, Inject, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Input, Host } from '@angular/core';
import { NgControl, ControlContainer } from '@angular/forms';
import { FORM_ERRORS } from './form-errors';
import { ControlErrorComponent } from './control-error/control-error.component';

import { merge, EMPTY, Observable } from 'rxjs';
import { ControlErrorContainerDirective } from './form-control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective {
  ref: ComponentRef<ControlErrorComponent> | undefined;
  container: ViewContainerRef;
  submit$: Observable<Event | unknown>;
  @Input() customErrors: any = {};

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Inject(FORM_ERRORS) private errors: any,
    @Optional() @Host() private form: FormSubmitDirective,
    private controlDir: NgControl) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit(): any {
    // tslint:disable-next-line: deprecation
    merge(
      this.submit$,
      this.control.valueChanges
    ).pipe().subscribe((v) => {
        const controlErrors = this.control.errors;
        if (controlErrors) {
          const firstKey = Object.keys(controlErrors)[0];
          const getError = this.errors[firstKey];
          const text: any = this.customErrors[firstKey] || getError(controlErrors[firstKey]);
          this.setError(text);
        } else if (this.ref) {
          this.setError(null);
        }
      })
  }

  get control(): any {
    return this.controlDir.control;
  }

  setError(text: any): any {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
  }


}
