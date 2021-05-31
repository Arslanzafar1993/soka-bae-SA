import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserPayload } from '../user/user.model';
import { AnosHttpClient } from '@anosrv-core/anos-http.client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: AnosHttpClient
  ) {}

  index(arbeitnehmerNr: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${environment.resourceServerApplicationContext}/arbeitnehmer/${arbeitnehmerNr}`;

    return this.http.get<UserPayload>( url, { headers, observe: 'response' });
  }
}
