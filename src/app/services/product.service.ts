import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  public getData(): Observable<any> {
    return this.http.get('/api/SanPham')
  }

  public deleteData(id: number): Observable<string> {
    return this.http.delete(`/api/SanPham/${id}`, { responseType: 'text' })
  }

  public getDataById(id: number): Observable<any> {
    return this.http.get(`/api/SanPham/${id}`)
  }

  public postData(data: any): Observable<any> {
    return this.http.post('/api/SanPham', data, { responseType: 'text' })
  }
}
