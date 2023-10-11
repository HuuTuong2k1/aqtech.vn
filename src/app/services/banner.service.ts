import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private http: HttpClient
  ) { }

  public getBanner(): Observable<any> {
    return this.http.get('/api/Banner')
  }

  public postBanner(data: any): Observable<string> {
    return this.http.post('/api/Banner', data, { responseType: 'text' })
  }

  public putBanner(data: any, id: number): Observable<string> {
    return this.http.put(`/api/Banner/${id}`, data, { responseType: 'text' })
  }

  public deleteBanner(id: number): Observable<string> {
    return this.http.delete(`/api/Banner/${id}`, { responseType: 'text' })
  }
}
