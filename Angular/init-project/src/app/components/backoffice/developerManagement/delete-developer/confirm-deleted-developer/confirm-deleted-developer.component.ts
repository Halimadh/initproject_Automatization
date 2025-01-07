import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-deleted-developer',
  templateUrl: './confirm-deleted-developer.component.html',
  styleUrls: ['./confirm-deleted-developer.component.css']
})
export class ConfirmDeletedDeveloperComponent {
  constructor(public dialogRef: MatDialog) {}


  closeDialog() {
    this.dialogRef.closeAll();
  }
}
