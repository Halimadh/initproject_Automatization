import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DependencyServiceService } from 'src/app/services/dependencyService/dependency-service.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { PopupConfirmDeleteDependencyComponent } from './popup_confirm_delete/popup-confirm-delete-dependency/popup-confirm-delete-dependency.component';
import { ProjectService } from 'src/app/services/project/project.service';
import { PopupModifyDependencyComponent } from './popup_modify_dependency/popup-modify-dependency/popup-modify-dependency.component';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css']
})
export class ListDataComponent {
  @Input() id_project:number=1;
  @Input() data: any[] =[];

  searchInput: string ='';
  propertyName: string | undefined;
  p:number =1;
  spinner : boolean = false;
  constructor( 
    private dialogRef: MatDialog, 
    private  srv:DependencyServiceService,
    private router: Router,
    private projectService:ProjectService
    ){ }
    ngAfterViewInit() {
      
    }
    
    onclickModify(id:number,name:string,version:string,type:string){
      this.dialogRef.open(PopupModifyDependencyComponent,{
        data:{
          _idproject:this.id_project,
          _id:id,
          _name:name,
          _version:version,
          _type:type
        }
      }).afterClosed().subscribe(
        (res:any)=>{
          this.projectService.getDependenciesbyIdProject(this.id_project).subscribe((res:any[])=>{
            this.data=res
            // console.log(this.dataSelect)
                  
           })
        }
       )
    }

    onclickDelete(id:number){
      this.srv.deleteDependency(id).subscribe((res:any)=>{},
       this.dialogRef.open(PopupConfirmDeleteDependencyComponent).afterClosed().subscribe(
        (res:any)=>{
          this.projectService.getDependenciesbyIdProject(this.id_project).subscribe((res:any[])=>{
            this.data=res
            // console.log(this.dataSelect)
                  
           })
        }
       )
       
      )
     
    }
}
