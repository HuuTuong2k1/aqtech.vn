import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient
  ) { }

  public getData(): Observable<any> {
    return this.http.get('/api/CauHoiKhachHang')
  }

  public putData(data: any, id: number): Observable<string> {
    return this.http.put(`/api/CauHoiKhachHang/${id}`, data, { responseType: 'text' })
  }

  public deleteData(id: number): Observable<string> {
    return this.http.delete(`/api/CauHoiKhachHang/${id}`, { responseType: 'text' })
  }
  
}
