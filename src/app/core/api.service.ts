import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createAuthorizationHeader() {
    let headers = new HttpHeaders();

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    headers = headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('x-auth', token);
      return headers;
  }


  get(url) {
    // const headers = this.createAuthorizationHeader();
    return this.http.get(`${environment.api_url}${url}`);
  }

  post(url, payload) {
    // const headers = this.createAuthorizationHeader();
    return this.http.post(`${environment.api_url}${url}`, payload);
  }

  put(url, payload) {
    // const headers = this.createAuthorizationHeader();
    return this.http.put(`${environment.api_url}${url}`, payload);
  }

  delete(url) {
    // const headers = this.createAuthorizationHeader();
    return this.http.delete(`${environment.api_url}${url}`);
  }
}
