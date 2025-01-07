import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { UserServiceService } from '../../../../services/UserService/user-service.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ProjectService } from 'src/app/services/project/project.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteConfirmedProjectComponent } from '../../projectManagement/deleteProject/delete-confirmed-project/delete-confirmed-project.component';
import { AddProjectComponent } from '../../projectManagement/addProject/add-project/add-project.component';
import { DialogConfig } from '@angular/cdk/dialog';

@Component({
  selector: 'app-see-details-user',
  templateUrl: './see-details-user.component.html',
  styleUrls: ['./see-details-user.component.css']
})
export class SeeDetailsUserComponent {
  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private observer : BreakpointObserver, 
    private projectService : ProjectService,
    private dialogService: DialogService,
    private dialogRef: MatDialog
  ){}

  username: any;
  id: any;
  name: any;
  role: any;
  email: any;
  
  projectList : any[] =[];

  
  ngOnInit(){
    let vals = this.route.params.subscribe(params => {
      this.username = params ['username'];
      this.id = params['id'];
      this.name = params ['name'];
      this.email = params['email'];
      this.role = params['role'];
      
    })
    this.getAllProject();
    
  }

  //to handle the error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value for '@transform': 'void'. Current value: 'open'.
  transform= 'void';
 
  ngAfterViewInit() {
    setTimeout(() => {
      this.transform = 'open';
      this.cdr.detectChanges(); 
    }, 0);
      this.observer.observe(['(max-width: 925px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
     
    
  }

 
  
  getAllProject(){
    this.projectService.getProjectByUserId(this.id).subscribe((projects : any)=>{
      this.projectList = projects; 
    })
  }

  onclickAddProject(){
    this.dialogRef.open(AddProjectComponent);
  }

  onclickDeleteProject(nameProject:string){
    console.log(nameProject);
      this.dialogService.openConfirmDeleteProjectDialog(nameProject)
      .afterClosed().subscribe((res:any)=>{
        console.log(res);
        if(res){
          this.projectService.deleteProject(nameProject).subscribe((res:any)=>{
            console.log(res);
            this.projectService.getAll().subscribe((data: any[]) => {
              console.log(data);
              this.projectList = data;
            });
            this.dialogRef.open(DeleteConfirmedProjectComponent);
          })
        }
      })
  }

  openSideBar(){
    this.sidenav.open();
  }
  closeSideBar(){
    this.sidenav.close();
  }

  onclickModify(username: string, id:number, name:string, email:string, role:string){
    this.router.navigate(['/admin/update-user', username, id, name, email, role]);
  }

}
