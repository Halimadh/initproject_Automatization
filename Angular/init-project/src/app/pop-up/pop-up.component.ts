import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
 
  constructor(private dialog: MatDialogRef<PopUpComponent>,
    ){
      
    }
  ngOnInit():void{}
closePopup(){
this.dialog.close()
}



}
