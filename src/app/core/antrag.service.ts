import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { UserStoreService } from './user-store.service';
import { AnosHttpClient } from '@anosrv-core/anos-http.client';

@Injectable({
  providedIn: 'root'
})
export class AntragService {

  constructor(
    private http: AnosHttpClient,
    private userStoreService: UserStoreService
  ) {}

  save(payload) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${environment.resourceServerApplicationContext}/process/tzr`;

    payload.geburtsdatum = this.convertDate(payload.geburtsdatum);
    payload.rentenBeginn = this.convertDate(payload.rentenBeginn);
    payload.versicherungsfall = this.convertDate(payload.versicherungsfall);

    const data = {
      instanceId: null,
      businessKey: this.userStoreService.user.value.arbeitnehmerNr,
      taskModel: {},
      payload,
    };

    return this.http.post<any>( url, data, { headers, observe: 'response' } )
      .pipe( catchError(this.handleError));
  }

  load(arbeitnehmerNr: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${environment.resourceServerApplicationContext}/tzr/antragsdaten/${arbeitnehmerNr}`;

    return this.http.get<any>( url, { headers, observe: 'response' } )
      .pipe( catchError(this.handleError));
  }

  private convertDate(date: string): string {
    if (date === '' || date === null || date === undefined) {
      return '';
    }

    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    const milliseconds = Date.parse(date);
    const newDate = new Date(milliseconds);

    return newDate.toLocaleDateString('de-DE', options);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occoured:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status} body was ${error.error}`
      );
    }

    return throwError('Something bad happened, please retry later');
  }
}
