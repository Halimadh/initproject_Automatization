import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FrameworkServiceService } from 'src/app/services/framework/framework-service.service';
import { ConfirmAddFrameworkComponent } from '../confirm-add-framework/confirm-add-framework.component';

@Component({
  selector: 'app-add-framework-dialog',
  templateUrl: './add-framework-dialog.component.html',
  styleUrls: ['./add-framework-dialog.component.css']
})
export class AddFrameworkDialogComponent {

  frameworks : any[] = [];
  name:string ='';
  nameVersion:string ='';

  constructor( 
    public dialogRef: MatDialog,
    private frameworkService: FrameworkServiceService ){}


  closeDialog() {
    this.dialogRef.closeAll();
  }

  getAll(){
    this.frameworkService.getAll().subscribe((data: any[]) => {
      this.frameworks = data;
    });
  }  

  alert : string = '';
  onclick(){
    if (this.name ==''||this.nameVersion==''){
      this.alert= "Please fill in all the required fields.";
    }
    else{
      this.frameworkService.addFramework(this.name,this.nameVersion).subscribe((res:any)=>{
        if (res){
          this.dialogRef.open(ConfirmAddFrameworkComponent);
        }
        else {
          this.alert = "Name already exists.";
        }
      })
    }
    
  }
}
