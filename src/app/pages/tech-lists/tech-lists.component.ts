import { Component, OnInit } from '@angular/core';
import { TechListsService } from './tech-lists.service';

@Component({
  selector: 'app-tech-lists',
  templateUrl: './tech-lists.component.html',
  styleUrls: ['./tech-lists.component.scss']
})
export class TechListsComponent implements OnInit {

  techs: Array<any> = [];
  constructor(private _techListService: TechListsService) { }

  ngOnInit(): void {
    this._techListService
    .getTechs()
    .subscribe(
      (response) => {
        this.techs = response;
        console.log(this.techs);
      }
    );
  }

}
