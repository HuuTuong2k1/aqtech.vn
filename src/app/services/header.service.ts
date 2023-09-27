import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private http: HttpClient
  ) { }

  public getHeader(): Observable<any> {
    return this.http.get('');
  }

  public addHeader(data: any): Observable<any> {
    return this.http.post('', data);
  }

  public updateHeader(data: any): Observable<any> {
    return this.http.patch('', data);
  }

  // Xem lại cách delete
  public deleteHeader(id: string): Observable<any> {
    return this.http.delete('');
  }

 }
