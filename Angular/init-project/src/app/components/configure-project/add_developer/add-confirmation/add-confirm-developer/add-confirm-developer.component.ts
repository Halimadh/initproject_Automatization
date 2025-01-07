import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeveloperServiceService } from 'src/app/services/developerService/developer-service.service';

@Component({
  selector: 'app-add-confirm-developer',
  templateUrl: './add-confirm-developer.component.html',
  styleUrls: ['./add-confirm-developer.component.css']
})
export class AddConfirmDeveloperComponent {
  list_dev : any[] = [];
  constructor(private dialogRef : MatDialog,private service_dev:DeveloperServiceService,){}

  closeDialog() {
    this.service_dev.getAllDevelopers().subscribe(
      (res:any)=>{
        this.list_dev=res
      }
    )
    this.dialogRef.closeAll();
  }
}
