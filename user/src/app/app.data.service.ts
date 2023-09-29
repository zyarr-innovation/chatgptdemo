import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppDataService implements OnInit {

  serverURL: string = ""

  clientList: string[] = [];
  adminList: string[] = [];
  constructor(private http: HttpClient) {
    let hostname = window.location.hostname;
    let portNumber = window.location.port;
    this.serverURL = "http://" + hostname + ":" + portNumber
  }

  ngOnInit(): void {

  }

  getClientList(): Observable<string[]> {
    return this.http.get<string[]>(this.serverURL + "/clientlist");
  }

  getAdminList(): Observable<string[]> {
    return this.http.get<string[]>(this.serverURL + "/adminlist");
  }

  send(adminMessage: string) {
    console.log('sending message: ', adminMessage)
    return this.http.post(this.serverURL + "/message", { "message": adminMessage });
  }
}
