import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.fragment.subscribe(
      fragment => document.querySelector(`#${fragment}`)?.scrollIntoView({ behavior: 'smooth' })
    );
  }
}
