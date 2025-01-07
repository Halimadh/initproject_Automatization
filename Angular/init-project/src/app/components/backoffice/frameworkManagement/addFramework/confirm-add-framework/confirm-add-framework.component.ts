import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FrameworkServiceService } from 'src/app/services/framework/framework-service.service';
import { VersionsService } from 'src/app/services/version/versions.service';

@Component({
  selector: 'app-confirm-add-framework',
  templateUrl: './confirm-add-framework.component.html',
  styleUrls: ['./confirm-add-framework.component.css']
})
export class ConfirmAddFrameworkComponent {

  versions : any[] = [];
  constructor(private dialogRef : MatDialog, private versionService: VersionsService){}

  closeDialog() {
    this.versionService.getAll().subscribe((data:any)=>{
      this.versions= data;
    })
    this.dialogRef.closeAll();
  }

}
