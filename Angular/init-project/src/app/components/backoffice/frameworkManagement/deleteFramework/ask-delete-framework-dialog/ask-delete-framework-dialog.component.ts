import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ask-delete-framework-dialog',
  templateUrl: './ask-delete-framework-dialog.component.html',
  styleUrls: ['./ask-delete-framework-dialog.component.css']
})
export class AskDeleteFrameworkDialogComponent {

  constructor(
    public dialogRef: MatDialog) {}


  closeDialog() {
    this.dialogRef.closeAll();
  }
}
