import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DeveloperServiceService } from 'src/app/services/developerService/developer-service.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { AskDeleteDeveloperComponent } from '../delete-developer/ask-delete-developer/ask-delete-developer.component';
import { ConfirmDeletedDeveloperComponent } from '../delete-developer/confirm-deleted-developer/confirm-deleted-developer.component';

@Component({
  selector: 'app-consulter-developer',
  templateUrl: './consulter-developer.component.html',
  styleUrls: ['./consulter-developer.component.css']
})
export class ConsulterDeveloperComponent {

  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;

  searchInput: string ='';

  propertyName: string | undefined;

  selectedRole:string='';
  developers: any[]=[];
  p:number =1;
  spinner : boolean = false;

  constructor( 
    private observer : BreakpointObserver, 
    private developerService: DeveloperServiceService , 
    private cdr: ChangeDetectorRef, 
    private dialogRef: MatDialog, 
    private dialogService: DialogService,
    private router: Router
    ){ }
  
    transform= 'void';

  //when load the age, retrieve all the data 
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 925px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    }); 
    this.getAllDevelopers();
    this.updateValue();
  }


  getAllDevelopers(){
   return this.developerService.getAllDevelopers().subscribe((data: any[]) => {
        this.developers = data;
      });
  
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
            this.developers= data;
          });
          this.dialogRef.open(ConfirmDeletedDeveloperComponent);
        })
      }
    })
  }



  //sidebar management
  openSideBar(){
    this.sidenav.open();
  }
  closeSideBar(){
    this.sidenav.close();
  }
  
  updateValue(): void {
    this.propertyName = 'new value';
    this.cdr.detectChanges();
  }  

}
