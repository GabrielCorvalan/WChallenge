import { IUser } from './../../interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  paises = [
    { id: 1, description: 'Argentina' },
    { id: 2, description: 'Brasil' },
    { id: 3, description: 'Colombia' },
    { id: 4, description: 'Venezuela' },
    { id: 5, description: 'Uruguay' }
  ];

  provincias = [
    { id: 1, idPais: 1, description: 'Buenos Aires' },
    { id: 2, idPais: 1, description: 'Catamarca' },
    { id: 3, idPais: 1, description: 'Chubut' },
    { id: 4, idPais: 1, description: 'Entre rios' },
    { id: 5, idPais: 2, description: 'Rio de Janeiro' },
    { id: 6, idPais: 3, description: 'Bogota' },
    { id: 7, idPais: 5, description: 'Montevideo' },
    { id: 8, idPais: 4, description: 'Caracas' },
  ];

  constructor(private http: HttpClient) { }


  getCountries(): Observable<Array<any>> {
    return of(this.paises).pipe(delay(200));
  }

  getProvinciasByCountry(idPais: number): Observable<Array<any>> {
    return of(this.provincias.filter(provincia => provincia.idPais == idPais)).pipe(delay(3000));
  }

  signUp(payload: IUser): Observable<any> {
    return this.http.post(`${environment.url}/signup`, payload);
  }
}
