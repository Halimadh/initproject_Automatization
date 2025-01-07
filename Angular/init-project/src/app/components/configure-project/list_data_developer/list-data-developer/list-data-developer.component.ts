import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AskDeleteDeveloperComponent } from 'src/app/components/backoffice/developerManagement/delete-developer/ask-delete-developer/ask-delete-developer.component';
import { ConfirmDeletedDeveloperComponent } from 'src/app/components/backoffice/developerManagement/delete-developer/confirm-deleted-developer/confirm-deleted-developer.component';
import { DeveloperServiceService } from 'src/app/services/developerService/developer-service.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-list-data-developer',
  templateUrl: './list-data-developer.component.html',
  styleUrls: ['./list-data-developer.component.css']
})
export class ListDataDeveloperComponent {
  @Input() id_project:number=1;
  @Input() data: any[] =[];

  searchInput: string ='';
  propertyName: string | undefined;
  p:number =1;
  spinner : boolean = false;
  constructor( 
    private dialogRef: MatDialog, 
    private dialogService: DialogService,
    private router: Router,
    private developerService:DeveloperServiceService
    ){ }
    ngAfterViewInit() {
      
    }
  
   onclickSee(username: string, id:number, name: string, email:string, role:string){
      this.spinner = true;
      this.router.navigate(['/admin/see-details-user', username, id, name, email, role]);
    }
    
    onclickModify(username: string, id:number, name:string, email:string, role: string){
      this.spinner = true;
      this.router.navigate(['/admin/update-user', username, id, name, email, role]);
    }
  
   
    onclickDelete(username : string){
      this.spinner = true;
      this.dialogRef.open(AskDeleteDeveloperComponent)
      .afterClosed().subscribe((res:any)=>{
        if(res){
          this.developerService.deleteDeveloperOnProject(username,this.id_project)
          .subscribe(()=>{
            this.developerService.getDevelopersByIdproject(this.id_project).subscribe((res:any[])=>{
              this.data=res
             })
            this.dialogRef.open(ConfirmDeletedDeveloperComponent);
          })
        }
      })
    }
    
}
