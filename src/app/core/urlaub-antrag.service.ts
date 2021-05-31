import { Injectable } from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import { concatMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UrlaubAntragResponse, UrlaubAntragRequest } from './urlaub-antrag-payload';
import { AnosHttpClient } from '@anosrv-core/anos-http.client';

@Injectable({
  providedIn: 'root'
})
export class UrlaubAntragService {

  public response: UrlaubAntragResponse;

  constructor(
    private http: AnosHttpClient
  ) {}

  index(arbeitnehmerNr: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const payload = { businessKey: arbeitnehmerNr };
    const url = `${environment.resourceServerApplicationContext}/process/entschaedigung`;

    return this.http.post<any>( url, payload, { headers, observe: 'response' } )
      .pipe(
        concatMap((response: HttpResponse<any>) => {
          const location = response.headers.get('Location');
          return this.http.get(location);
      }));
  }

  save(payload: UrlaubAntragRequest) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${environment.resourceServerApplicationContext}/process/entschaedigung/${payload.instanceId}`;

    return this.http.put<any>( url, payload, { headers, observe: 'response' } )
      .pipe( concatMap((response) => {
        return this.http.get(url);
    }));
  }

  delete(instanceId: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${environment.resourceServerApplicationContext}/process/entschaedigung/${instanceId}`;

    return this.http.delete<any>( url, { headers, observe: 'response' });
  }
}
