import { LoadingService } from './../../utils/loading/loading.service';
import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TechListsService } from './tech-lists.service';

interface IOrderBy {
  orderProperty: string;
  type: 'asc' | 'desc';
}

@Component({
  selector: 'app-tech-lists',
  templateUrl: './tech-lists.component.html',
  styleUrls: ['./tech-lists.component.scss']
})
export class TechListsComponent implements OnInit {

  techs: Array<any> = [];
  order: IOrderBy = {
    type: 'asc',
    orderProperty: 'tech'
  };

  search = new FormControl('');
  constructor(private _techListService: TechListsService,
              private _loadingService: LoadingService) { }

  ngOnInit(): void {
    this._loadingService.show();
    this._techListService.getTechs().pipe(
      finalize(() => this._loadingService.hide())
    )
    .subscribe((response) => this.techs = response);
  }

  setOrderProperty(orderProperty: string): void {
    this.order = {
      type: this.order.type === 'asc' ? 'desc' : 'asc',
      orderProperty
    }
  }

}
