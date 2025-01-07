import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmed-project',
  templateUrl: './delete-confirmed-project.component.html',
  styleUrls: ['./delete-confirmed-project.component.css']
})
export class DeleteConfirmedProjectComponent {
  constructor(public dialogRef: MatDialog) {}


  closeDialog() {
    this.dialogRef.closeAll();
  }
}
