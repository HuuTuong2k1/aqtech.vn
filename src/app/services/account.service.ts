import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  public getData(): Observable<any> {
    return this.http.get('/api/TaiKhoan')
  }

  public postData(data: any): Observable<string> {
    return this.http.post('/api/TaiKhoan', data, { responseType: 'text' })
  }

  public deleteData(id: number): Observable<string> {
    return this.http.delete(`/api/TaiKhoan/${id}`, { responseType: 'text'} )
  }

  public putData(data: any, id: number): Observable<string> {
    return this.http.put(`/api/TaiKhoan/${id}`, data, { responseType: 'text' })
  }
}
