import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input()
  nombre = 'default';
  // dialog: boolean;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    if (!this.loadingService.get(this.nombre)) {
      this.loadingService.register(this.nombre);
    }
  }

  get isLoading(): boolean {
    return this.loadingService.get(this.nombre);
  }

}
