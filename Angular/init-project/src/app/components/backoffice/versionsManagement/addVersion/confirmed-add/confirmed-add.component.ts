import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VersionsService } from 'src/app/services/version/versions.service';

@Component({
  selector: 'app-confirmed-add',
  templateUrl: './confirmed-add.component.html',
  styleUrls: ['./confirmed-add.component.css']
})
export class ConfirmedAddComponent {

  versions : any[] = [];
  constructor(private dialogRef : MatDialog, private versionService: VersionsService){}

  closeDialog() {
    this.versionService.getAll().subscribe((data:any)=>{
      this.versions= data;
    })
    this.dialogRef.closeAll();
  }
}
