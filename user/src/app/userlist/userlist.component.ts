import { Component } from '@angular/core';
import { AppDataService } from '../app.data.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent {
  serverURL: string = ""
  clientList$: string[] = []

  constructor(
    private clipboard: Clipboard,
    private appDataService: AppDataService) {

    let hostname = window.location.hostname;
    let portNumber = window.location.port;
    this.serverURL = 'http://' + hostname + ":" + portNumber;
  }

  ngOnInit(): void {
    this.appDataService.getClientList().subscribe(data => this.clientList$ = data);
    const socket = io(this.serverURL);
    socket.on('message', (data) => {
      this.clientList$.push(data)
    })
  }

  copyInputMessage(inputElement: HTMLTextAreaElement) {
    this.clipboard.copy(inputElement.value);;
  }
}
