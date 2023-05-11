import { Component } from '@angular/core';
import { AppDataService } from '../app.data.service';

@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.css']
})
export class AdminListComponent {
  adminList$: string[] = [];

  constructor(
    private appDataService: AppDataService) {
  }

  ngOnInit(): void {
    this.appDataService.getAdminList().subscribe(data => this.adminList$ = data);
  }

  sendInputMessage(inputElement: HTMLTextAreaElement) {
    this.appDataService.send(inputElement.value).subscribe(data => console.log("data send..."));
  }
}
