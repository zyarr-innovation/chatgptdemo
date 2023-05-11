import { Injectable, OnInit } from '@angular/core';
import { SocketService } from './app.socket.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppDataService implements OnInit {

  clientList: string[] = [];
  adminList: string[] = [];
  constructor(private http: HttpClient,
    private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.on('message').subscribe((data: any) => {
      console.log(data);
      this.clientList.push(data);
    });
  }

  getClientList(): Observable<string[]> {
    return this.http.get<string[]>("http://localhost:3000/clientlist");
  }

  getAdminList(): Observable<string[]> {
    return this.http.get<string[]>("http://localhost:3000/adminlist");
  }

  send(adminMessage: string) {
    console.log('sending message: ', adminMessage)
    return this.http.post("http://localhost:3000/message", JSON.stringify({ "message": adminMessage }));
  }
}
