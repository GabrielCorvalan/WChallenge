import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  template: `<p class="help is-danger" [class.hide]="_hide">{{_text}}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .is-danger {
        color: #ff3860;
        font-size: .75rem;
        margin: 0px;
        margin-top: .25rem;
      }
      .hide {
        display: none;
      }
    `
  ]
})
export class ControlErrorComponent implements OnInit {
  _text: any;
  _hide = true;

  @Input() set text(value: any) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
