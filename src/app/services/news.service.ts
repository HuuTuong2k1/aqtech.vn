import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
 }
