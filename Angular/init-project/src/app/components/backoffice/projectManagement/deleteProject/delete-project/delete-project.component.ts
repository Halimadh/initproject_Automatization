import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent {
  constructor(
    public dialogRef: MatDialog) {}


  closeDialog() {
    this.dialogRef.closeAll();
  }
}
