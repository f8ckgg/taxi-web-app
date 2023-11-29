import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthenticationRequest, AuthenticationResponse, UserDTO} from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly API_URL = environment.apiUrl+ '/api/auth';

  constructor(private http: HttpClient) {}

  register(request: UserDTO): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.API_URL}/register`, request);
  }

  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.API_URL}/login`, request);
  }
}
