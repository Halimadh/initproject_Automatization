import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmed',
  templateUrl: './delete-confirmed.component.html',
  styleUrls: ['./delete-confirmed.component.css']
})
export class DeleteConfirmedComponent {
  constructor(public dialogRef: MatDialog) {}


  closeDialog() {
    this.dialogRef.closeAll();
  }
}
