import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  public getData(): Observable<any> {
    return this.http.get('/api/BaiViet')
  }

  public postData(data: any): Observable<string> {
    return this.http.post('/api/BaiViet', data, { responseType: 'text' })
  }

  public deleteData(id: number): Observable<string> {
    return this.http.delete(`/api/BaiViet/${id}`, { responseType: 'text' })
  }

  public putData(id: number ,data: any): Observable<string> {
    return this.http.put(`/api/BaiViet/${id}`, data, { responseType: 'text' })
  }
 }
