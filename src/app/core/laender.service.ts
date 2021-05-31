import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Land } from './land.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AnosHttpClient } from '@anosrv-core/anos-http.client';

@Injectable({
  providedIn: 'root'
})
export class LaenderService {
  constructor(
    private http: AnosHttpClient
  ) { }

  index() {
    return this.http.get<Land[]>(`${environment.resourceServerApplicationContext}/grunddaten/laender/de`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occoured:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status} body was ${error.error}`
      );
    }

    return throwError('Something bad happened, please retry later. Error calling LaenderService');
  }
}
