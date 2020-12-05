import { ITech } from './../../interfaces/ITech';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TechListsRoutingModule } from './tech-lists-routing.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechListsService {

  constructor(private http: HttpClient) { }

  getTechs(): Observable<Array<ITech>> {
    return this.http.get<Array<ITech>>(`${environment.url}/techs`);
  }
}
