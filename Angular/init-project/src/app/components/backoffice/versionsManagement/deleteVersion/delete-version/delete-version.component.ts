import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-version',
  templateUrl: './delete-version.component.html',
  styleUrls: ['./delete-version.component.css']
})
export class DeleteVersionComponent {
  constructor(
    public dialogRef: MatDialog) {}


  closeDialog() {
    this.dialogRef.closeAll();
  }
}
