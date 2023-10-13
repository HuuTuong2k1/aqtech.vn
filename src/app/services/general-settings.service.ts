import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {

  constructor(
    private http: HttpClient
  ) { }

  public getThietLapChung(): Observable<any> {
    return this.http.get('/api/ThietLapChung')
  }
}
