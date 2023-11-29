import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RoadDTO} from "../interfaces";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoadService {
  private apiUrl = environment.apiUrl+'/api/roads';

  constructor(private http: HttpClient) { }

  getPendingRoadsByUserId(): Observable<RoadDTO[]> {
    return this.http.get<RoadDTO[]>(`${this.apiUrl}/pending/user`);
  }

  getPendingRoads(): Observable<RoadDTO[]> {
    return this.http.get<RoadDTO[]>(`${this.apiUrl}/pending/driver`);
  }

  getInProgressRoadsByDriverId(): Observable<RoadDTO[]> {
    return this.http.get<RoadDTO[]>(`${this.apiUrl}/in-progress/driver`);
  }

  getFinishedRoadsByDriverId(): Observable<RoadDTO[]> {
    return this.http.get<RoadDTO[]>(`${this.apiUrl}/finished/driver`);
  }

  getRoadById(id: number): Observable<RoadDTO> {
    return this.http.get<RoadDTO>(`${this.apiUrl}/${id}`);
  }

  createRoad(road: RoadDTO): Observable<RoadDTO> {
    return this.http.post<RoadDTO>(`${this.apiUrl}`, road);
  }

  updateRoad(id: number, road: RoadDTO): Observable<RoadDTO> {
    return this.http.put<RoadDTO>(`${this.apiUrl}/${id}`, road);
  }

  deleteRoad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  acceptRoad(id: number, carId: number): Observable<RoadDTO> {
    return this.http.put<RoadDTO>(`${this.apiUrl}/accept/${id}/${carId}`, {});
  }

  finishRoad(id: number): Observable<RoadDTO> {
    return this.http.put<RoadDTO>(`${this.apiUrl}/finish/${id}`, {});
  }
}

