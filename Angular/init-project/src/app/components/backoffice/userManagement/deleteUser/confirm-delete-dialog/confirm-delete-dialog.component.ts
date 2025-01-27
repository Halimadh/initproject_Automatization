import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css']
})

export class ConfirmDeleteDialogComponent {

  constructor( public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent> ){}
  
  closeDialog() {
    this.dialogRef.close(false);
  }
}
