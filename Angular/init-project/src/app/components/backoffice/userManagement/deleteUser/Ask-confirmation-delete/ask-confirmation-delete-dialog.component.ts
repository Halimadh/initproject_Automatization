import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confimation-dialog',
  templateUrl: './ask-confirmation-delete-dialog.component.html',
  styleUrls: ['./ask-confirmation-delete-dialog.component.css']
})
export class DeleteConfimationDialogComponent {
content:any
  constructor(
    public dialogRef: MatDialogRef<DeleteConfimationDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any 
       ) {
        this.content=data.content
       }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
