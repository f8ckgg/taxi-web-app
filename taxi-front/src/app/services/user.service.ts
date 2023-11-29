import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {UserDTO} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.apiUrl+'/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.API_URL);
  }

  getMe(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.API_URL}/me`);
  }

  updateUser(name: string): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.API_URL}/me/${name}`, null);
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/me`);
  }
}
