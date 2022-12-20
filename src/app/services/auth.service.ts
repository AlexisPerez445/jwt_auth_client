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

  sendEmail(email: string): Observable<string>{
    const url = `${environment.baseURL}/${this.authURL}/forgot-password`;
    const body = JSON.stringify({
      email
    });
    return this.oHttp.post<string>(url, body, {headers: environment.headers});
  }

  resetPassword( password: string, password2: string ): Observable<string>{
    const url = `${environment.baseURL}/${this.authURL}/reset-password`;
    const body = JSON.stringify({
      password,
      password2
    });
    const headers = {
      'content-type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
    }
    return this.oHttp.post<string>(url,body, {headers});
  }

}
