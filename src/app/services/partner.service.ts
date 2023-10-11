import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(
    private http: HttpClient
  ) { }

  public getData(): Observable<any> {
    return this.http.get('/api/DoiTac')
  }

  public postData(data: any): Observable<string> {
    return this.http.post('/api/DoiTac', data, {responseType: 'text'})
  }

  public deleteData(id: number): Observable<string> {
    return this.http.delete(`/api/DoiTac/${id}`, {responseType: 'text'})
  }

  public putData(data: any, id: number): Observable<string> {
    return this.http.put(`/api/DoiTac/${id}`, data, {responseType: 'text'})
  }
}
