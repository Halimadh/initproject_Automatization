import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-confirm-delete-dependency',
  templateUrl: './popup-confirm-delete-dependency.component.html',
  styleUrls: ['./popup-confirm-delete-dependency.component.css']
})
export class PopupConfirmDeleteDependencyComponent {
  constructor(private dialogRef : MatDialog){}

  closeDialog() {
    this.dialogRef.closeAll();
  }
}
