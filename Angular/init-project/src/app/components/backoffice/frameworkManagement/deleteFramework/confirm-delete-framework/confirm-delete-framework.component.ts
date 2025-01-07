import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-framework',
  templateUrl: './confirm-delete-framework.component.html',
  styleUrls: ['./confirm-delete-framework.component.css']
})
export class ConfirmDeleteFrameworkComponent {

  constructor( public dialogRef: MatDialog){}
  
  closeDialog() {
    this.dialogRef.closeAll();
  }

}
