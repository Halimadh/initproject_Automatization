import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { FrameworkServiceService } from 'src/app/services/framework/framework-service.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { DeleteConfirmedProjectComponent } from '../deleteProject/delete-confirmed-project/delete-confirmed-project.component';

@Component({
  selector: 'app-consulter-project',
  templateUrl: './consulter-project.component.html',
  styleUrls: ['./consulter-project.component.css']
})
export class ConsulterProjectComponent {

  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;

  searchInput: string ='';
  p:number =1;
  
  projects : any[] = [];
  constructor(
    private observer : BreakpointObserver,
    private projectService: ProjectService,
    private userService: UserServiceService,
    private dialogRef: MatDialog, 
    private dialogService: DialogService,
  ) {}

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
    this.getAll();
  }

    //sidebar management
    openSideBar(){
      this.sidenav.open();
    }
    closeSideBar(){
      this.sidenav.close();
    }

    getAll(){
      this.projectService.getAll().subscribe((data:any)=>{
        this.projects=data;
      })
    }    

    onclickDeleteProject(name : string){
      console.log(name);
      this.dialogService.openConfirmDeleteProjectDialog(name)
      .afterClosed().subscribe((res:any)=>{
        console.log(res);
        if(res){
          this.projectService.deleteProject(name).subscribe((res:any)=>{
            console.log(res);
            this.projectService.getAll().subscribe((data: any[]) => {
              console.log(data);
              this.projects = data;
            });
            this.dialogRef.open(DeleteConfirmedProjectComponent);
          })
        }
      })
    }

}
