import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeveloperServiceService } from 'src/app/services/developerService/developer-service.service';
import { AddConfirmDeveloperComponent } from '../../add-confirmation/add-confirm-developer/add-confirm-developer.component';

@Component({
  selector: 'app-add-developer-toproject',
  templateUrl: './add-developer-toproject.component.html',
  styleUrls: ['./add-developer-toproject.component.css']
})
export class AddDeveloperToprojectComponent {
  list_dev : any[] = [];
  select_dev :any;
  
  
  ngOnInit(){
    this.getAllDevelopers();
  }
  constructor( 
  
    public dialogRef: MatDialog,
   private service_dev:DeveloperServiceService,
   @Inject(MAT_DIALOG_DATA) public data: any
    ){}

  closeDialog() {
    this.dialogRef.closeAll();
  }

  getAllDevelopers(){
    this.service_dev.getAllDevelopers().subscribe(
      (res:any)=>{
        this.list_dev=res
      }
    )
    
  }  
  alert : string = '';

  onclick(){
   if(this.select_dev==null){
    this.alert="select one or most developer"
   }else{
    for(let i of this.select_dev){
     this.service_dev.getDeveloperByUsername(i).subscribe((res:any)=>{
     this.service_dev.AddDeveloperToProject(this.data._idproject,res.id).subscribe((res:any)=>{
     })
    })
      
    }
    this.dialogRef.open(AddConfirmDeveloperComponent);
    }
   
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


