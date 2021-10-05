import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  APP_URL = 'http://localhost:8000/players';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) { }

  uploadImg(img): any {
    return this.http.post<any>(this.APP_URL + '/upload', img);
  }
  createPlayer(playerData): any {
    return this.http.post<any>(this.APP_URL, playerData, this.httpOptions);
  }
  getPlayers(): any {
    return this.http.get<any>(this.APP_URL);
  }
  getPlayer(id): any {
    return this.http.get<any>(this.APP_URL + '/' + id);
  }
  deletePlayer(id): any {
    return this.http.delete<any>(this.APP_URL + '/' + id);
  }
  winCon(id, estrellas): any {
    return this.http.put<any>(this.APP_URL + '/win/' + id, { estrellas });
  }
}
