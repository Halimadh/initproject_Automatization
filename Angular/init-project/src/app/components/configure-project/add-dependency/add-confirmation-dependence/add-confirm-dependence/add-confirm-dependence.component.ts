import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-confirm-dependence',
  templateUrl: './add-confirm-dependence.component.html',
  styleUrls: ['./add-confirm-dependence.component.css']
})
export class AddConfirmDependenceComponent {
  versions : any[] = [];
  constructor(private dialogRef : MatDialog){}

  closeDialog() {
    this.dialogRef.closeAll();
  }
}
