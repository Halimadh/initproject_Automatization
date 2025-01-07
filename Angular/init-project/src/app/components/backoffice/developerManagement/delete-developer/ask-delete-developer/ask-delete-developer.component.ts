import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ask-delete-developer',
  templateUrl: './ask-delete-developer.component.html',
  styleUrls: ['./ask-delete-developer.component.css']
})
export class AskDeleteDeveloperComponent {
  constructor(
    public dialogRef: MatDialogRef<AskDeleteDeveloperComponent> ) {}

  closeDialog() {
    this.dialogRef.close(false);
  }

}
