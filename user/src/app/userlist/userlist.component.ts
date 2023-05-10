import { Component } from '@angular/core';
import { AppDataService } from '../app.data.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent {
  clientList$: string[] = []

  constructor(
    private clipboard: Clipboard,
    private appDataService: AppDataService) {
  }

  ngOnInit(): void {
    this.appDataService.getClientList().subscribe(data => this.clientList$ = data);
  }

  copyInputMessage(inputElement: HTMLTextAreaElement) {
    this.clipboard.copy(inputElement.value);;
  }
}
