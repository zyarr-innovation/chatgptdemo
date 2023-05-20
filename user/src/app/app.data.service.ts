import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppDataService implements OnInit {

  clientList: string[] = [];
  adminList: string[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  getClientList(): Observable<string[]> {
    return this.http.get<string[]>("http://localhost:3000/clientlist");
  }

  getAdminList(): Observable<string[]> {
    return this.http.get<string[]>("http://localhost:3000/adminlist");
  }

  send(adminMessage: string) {
    console.log('sending message: ', adminMessage)
    return this.http.post("http://localhost:3000/message", { "message": adminMessage });
  }
}
