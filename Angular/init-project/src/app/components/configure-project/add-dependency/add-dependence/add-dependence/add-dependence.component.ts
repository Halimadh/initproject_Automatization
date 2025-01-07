import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DependencyServiceService } from 'src/app/services/dependencyService/dependency-service.service';
import { AddConfirmDependenceComponent } from '../../add-confirmation-dependence/add-confirm-dependence/add-confirm-dependence.component';

@Component({
  selector: 'app-add-dependence',
  templateUrl: './add-dependence.component.html',
  styleUrls: ['./add-dependence.component.css']
})
export class AddDependenceComponent {
  
  name_dependency:string ='';
  version_dependency: string ='';
  type_dependency:string='';

  ngOnInit(){
    this.getAllFrameworks();
  }
  constructor( 
    public dialogRef: MatDialog,
    private serviceDependency:DependencyServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
   
    ){}

  closeDialog() {
    this.dialogRef.closeAll();
  }

  getAllFrameworks(){
    
  }  

  getAll(){
  
  }
  alert : string = '';

  onclick(){
    this.serviceDependency.createDependency(this.name_dependency,this.version_dependency,this.type_dependency,this.data._idproject)
    .subscribe(
      (res:any)=>{
        this.dialogRef.open(AddConfirmDependenceComponent)
      }
     
    )
   
    }
    
    /*
    if (this.name ==''){
      this.alert= "Please enter a valid name. ";
    }
    else{
      this.frameworkService.addFramework(this.name).subscribe((res:any)=>{
        if (res){
          this.dialogRef.open(ConfirmAddFrameworkComponent);
        }
        else {
          this.alert = "Name already exists.";
        }
      })
    }
    */
  // }
}
