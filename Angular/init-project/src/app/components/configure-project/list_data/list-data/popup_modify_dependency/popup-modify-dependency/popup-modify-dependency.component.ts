import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DependencyServiceService } from 'src/app/services/dependencyService/dependency-service.service';
import { PopupConfirmModifyComponent } from '../../popup_confirm_modify/popup-confirm-modify/popup-confirm-modify.component';

@Component({
  selector: 'app-popup-modify-dependency',
  templateUrl: './popup-modify-dependency.component.html',
  styleUrls: ['./popup-modify-dependency.component.css']
})
export class PopupModifyDependencyComponent {
  name_dependency:string ='';
  version_dependency: string ='';
  type_dependency:string='';
  change_name:boolean=false;
  change_version:boolean=false;
  change_type:boolean=false;
  change:boolean=false;
  
  constructor( 
    public dialogRef: MatDialog,
    private serviceDependency:DependencyServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
   
    ){}
    ngOnInit(){
      this.name_dependency=this.data._name,
      this.version_dependency=this.data._version,
      this.type_dependency=this.data._type
    }

  closeDialog() {
    this.dialogRef.closeAll();
  }

  getAllFrameworks(){
    
  }  

  getAll(){
  
  }
  alert : string = '';

  onclick(){
   
    if (this.name_dependency !=this.data._nam && this.version_dependency !=this.data._version && this.type_dependency!=this.data._type) {
      this.serviceDependency.updatename(this.data._id, this.name_dependency).subscribe(
        (res: any) => {}
      )
      this.serviceDependency.updateVersion(this.data._id, this.version_dependency).subscribe(
        (res: any) => {}
      )
      this.serviceDependency.updateType(this.data._id, this.type_dependency).subscribe(
        (res: any) => {})
      
      this.dialogRef.open(PopupConfirmModifyComponent)
    }else{
      this.alert = "please fields is necessary";
    }

    // if (this.version_dependency != this.data._version) {
    //   this.serviceDependency.updateVersion(this.data._id, this.version_dependency).subscribe(
    //     (res: any) => {
    //       this.change_version = true
    //     }
    //   )
    //   if(this.change_version){
    //     this.change=true
    //   }
    // }
    // if (this.type_dependency != this.data._type) {
    //   this.serviceDependency.updateType(this.data._id, this.type_dependency).subscribe(
    //     (res: any) => {
    //       this.change_type = true
    //     })
    //     if(this.change_type){
    //       this.change=true
    //     }
    //   }
    // if (this.change) {
    //   this.dialogRef.open(PopupConfirmModifyComponent)
    // }
  }
}
