import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { DeveloperServiceService } from 'src/app/services/developerService/developer-service.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-see-detail-developer',
  templateUrl: './see-detail-developer.component.html',
  styleUrls: ['./see-detail-developer.component.css']
})
export class SeeDetailDeveloperComponent {

  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private observer : BreakpointObserver, 
    private developerService : DeveloperServiceService,
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
      this.id = params['id'];
      this.name = params ['name'];
      this.username = params ['username'];
      this.email = params['email'];
      })
    this.getProjectById_Developer();
    
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

 
  
  getProjectById_Developer(){
    this.developerService.getprojectByIdDeveloper(this.id).subscribe((projects : any)=>{
      this.projectList = projects; 
    })
  }

  // onclickAddProject(){
  //   this.dialogRef.open(AddProjectComponent);
  // }

  // onclickDeleteProject(nameProject:string){
  //   console.log(nameProject);
  //     this.dialogService.openConfirmDeleteProjectDialog(nameProject)
  //     .afterClosed().subscribe((res:any)=>{
  //       console.log(res);
  //       if(res){
  //         this.projectService.deleteProject(nameProject).subscribe((res:any)=>{
  //           console.log(res);
  //           this.projectService.getAll().subscribe((data: any[]) => {
  //             console.log(data);
  //             this.projectList = data;
  //           });
  //           this.dialogRef.open();
  //         })
  //       }
  //     })
  // }

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
