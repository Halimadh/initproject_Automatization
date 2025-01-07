import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-confirm-modify',
  templateUrl: './popup-confirm-modify.component.html',
  styleUrls: ['./popup-confirm-modify.component.css']
})
export class PopupConfirmModifyComponent {
  constructor(private dialogRef : MatDialog){}

  closeDialog() {
    this.dialogRef.closeAll();
  }
}
