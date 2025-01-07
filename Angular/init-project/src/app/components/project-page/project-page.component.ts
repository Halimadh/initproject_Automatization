import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { PopupMessageComponent } from '../test-home/popup-message/popup-message.component';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { ConfirmDeleteDialogComponent } from '../backoffice/userManagement/deleteUser/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent  {
  projects :any
  searchInput: string ='';
  p:number =1;
  isRed:boolean=false;
  isOrangr:boolean=false;
  isGreen:boolean=false;
  
  
  constructor(private service:ProjectService,private router: Router ,
    private dialogRef : MatDialog,private dialogService: DialogService){}
ngOnInit(){
let user:any=localStorage.getItem('userDetails');
let obj=JSON.parse(user);
this.service.getProjectByUserId(obj.id).subscribe((response:any)=>{
  this.projects=response
})
}
clickConfig(id_project:number,_statut:string,_description:string){
 this.router.navigate(['configure_project',id_project,_statut,_description])
}
run(nameProject:any,type:any){
  this.service.runProject(nameProject,type).subscribe((response:any)=>{
   
  })
  console.log(nameProject,type)
}
DeleteProject( nameProject:any){
  this.dialogService.openConfirmDialog('this project')
  .afterClosed().subscribe((res:any)=>{
    if(res){
      this.service.deleteProject(nameProject).subscribe((response:any)=>{
          if(response==true){
            this.dialogRef.open(ConfirmDeleteDialogComponent);
           }
           else{
            const dialogConfig: MatDialogConfig = {
              data: {content:"Ooop!! deletion failed"},
            };
            this.dialogRef.open(PopupMessageComponent, dialogConfig);
           }
      })
      window.location.reload();
    }
  })
}



}

