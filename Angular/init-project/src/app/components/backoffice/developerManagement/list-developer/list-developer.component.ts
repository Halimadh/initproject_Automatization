import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeveloperServiceService } from 'src/app/services/developerService/developer-service.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { ConfirmDeletedDeveloperComponent } from '../delete-developer/confirm-deleted-developer/confirm-deleted-developer.component';
import { AskDeleteDeveloperComponent } from '../delete-developer/ask-delete-developer/ask-delete-developer.component';

@Component({
  selector: 'app-list-developer',
  templateUrl: './list-developer.component.html',
  styleUrls: ['./list-developer.component.css']
})
export class ListDeveloperComponent {
@Input() developerList: any[] =[];

  searchInput: string ='';
  propertyName: string | undefined;
  p:number =1;
  spinner : boolean = false;
  constructor( 
    private developerService: DeveloperServiceService , 
    private dialogRef: MatDialog, 
    private dialogService: DialogService,
    private router: Router
    ){ }
    ngAfterViewInit() {
      
    }
  
   onclickSee(id:number, name: string, username: string, email:string){
      this.spinner = true;
      this.router.navigate(['/admin/see-details-developer',id,name,username,email]);
    }
    
    onclickModify(id:number, name:string, username: string, email:string,){
      this.spinner = true;
      this.router.navigate(['/admin/update-developer',id,name,username,email]);
    }
  
    onclickDelete(username : string){
      this.spinner = true;
      console.log(username);
       this.dialogRef.open(AskDeleteDeveloperComponent)
      .afterClosed().subscribe((res:any)=>{
        if(res){
          this.developerService.deleteDeveloper(username).subscribe(()=>{
            this.developerService.getAllDevelopers().subscribe((data: any[]) => {
              console.log(data);
              this.developerList= data;
            });
            this.dialogRef.open(ConfirmDeletedDeveloperComponent);
          })
        }
      })
    }


}
