import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private http: HttpClient
  ) { }

  public getHeader(): Observable<any> {
    return this.http.get('/api/Header');
  }

  public addHeader(data: any): Observable<string> {
    return this.http.post('/api/Header', data, { responseType: 'text' })
  }

  public updateHeader(id: number, data: any): Observable<string> {
    return this.http.put(`/api/Header/${id}`, data, { responseType: 'text' });
  }

  public deleteHeader(id: number): Observable<string> {
    return this.http.delete(`/api/Header/${id}`, { responseType: 'text' }).pipe(
      map(() => 'Xóa header thành công'), // Trả về một chuỗi văn bản sau khi xóa thành công
      catchError((error) => {
        console.error('Xóa không thành công:', error);
        throw error;
      })
    );
  }

 }
