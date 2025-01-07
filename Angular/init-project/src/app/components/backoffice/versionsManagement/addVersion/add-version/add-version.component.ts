import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FrameworkServiceService } from 'src/app/services/framework/framework-service.service';
import { VersionsService } from 'src/app/services/version/versions.service';
import { ConfirmedAddComponent } from '../confirmed-add/confirmed-add.component';

@Component({
  selector: 'app-add-version',
  templateUrl: './add-version.component.html',
  styleUrls: ['./add-version.component.css']
})
export class AddVersionComponent {
  versions : any[] = [];
  framework_front : any[]=[];
  frameworkAll : any[]=[];
  nameVersion:string ='';
  nameFramework: string ='';

  ngOnInit(){
    this.getAllFrameworks();
  }
  constructor( 
    public dialogRef: MatDialog,
    private frameworkService: FrameworkServiceService ,
    private versionService: VersionsService
    ){}

  closeDialog() {
    this.dialogRef.closeAll();
  }

  getAllFrameworks(){
    this.frameworkService.getAll().subscribe((data: any[]) => {
     this.frameworkAll=data;
      for(var elt of data){
        if(elt.type=="framework_front"){
          this.framework_front.push(elt)
        }
      }
    });
  }  

  getAll(){
    this.versionService.getAll().subscribe((data:any)=>{
      this.versions = data;
    });
  }
  alert : string = '';

  onclick(){
    if (this.nameVersion== '' || this.nameFramework == ''){
      this.alert= "Please fill in all the required fields. ";
    }
    else{
      this.frameworkService.getIdFrameworkByName(this.nameFramework).subscribe((data:any)=>{
        this.versionService.addVersion(this.nameVersion, data.id).subscribe((res:any)=>{
          if (res){
            this.versionService.getAll().subscribe((data:any)=>{
              this.versions = data;
            });
            this.dialogRef.open(ConfirmedAddComponent);
          }
          else {
            this.alert = "Framework name doesnt exist. ";
          }
        })
      }) 
      
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
  }
}
