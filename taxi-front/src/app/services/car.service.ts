import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CarDTO} from "../interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly API_URL = environment.apiUrl+'/api/cars';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<CarDTO[]> {
    return this.http.get<CarDTO[]>(`${this.API_URL}`);
  }

  getCarById(id: number): Observable<CarDTO> {
    return this.http.get<CarDTO>(`${this.API_URL}/${id}`);
  }

  createCar(carDTO: CarDTO): Observable<CarDTO> {
    return this.http.post<CarDTO>(`${this.API_URL}`, carDTO);
  }

  updateCar(id: number, carDTO: CarDTO): Observable<CarDTO> {
    return this.http.put<CarDTO>(`${this.API_URL}/${id}`, carDTO);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}

