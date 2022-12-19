import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private oHttp: HttpClient
  ) { }

  authURL = 'auth'

  login(email: string, password: string): Observable<AuthResponse>{
    const url = `${environment.baseURL}/${this.authURL}/login`;
    const body = JSON.stringify({
      email,
      password
    });
    return this.oHttp.post<AuthResponse>(url,body, {headers: environment.headers});
  }
}
