import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {BillDTO} from "../interfaces";



@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = environment.apiUrl+'/api/bills';

  constructor(private http: HttpClient) { }

  getAllBills(): Observable<BillDTO[]> {
    return this.http.get<BillDTO[]>(this.apiUrl);
  }

  getBillById(id: number): Observable<BillDTO> {
    return this.http.get<BillDTO>(`${this.apiUrl}/${id}`);
  }

  createBill(billDTO: BillDTO): Observable<BillDTO> {
    return this.http.post<BillDTO>(this.apiUrl, billDTO);
  }
}
