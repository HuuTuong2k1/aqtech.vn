import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  public getComment(): Observable<any> {
    return this.http.get('api/BinhLuan')
  }

  public deleteComment(id: number): Observable<string> {
    return this.http.delete(`api/BinhLuan/${id}`, { responseType: 'text' })
  }
}
