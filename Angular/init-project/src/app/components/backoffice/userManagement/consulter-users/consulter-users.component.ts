import { Component, ViewChild, ChangeDetectorRef,   } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserServiceService } from '../../../../services/UserService/user-service.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../deleteUser/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-consulter-users',
  templateUrl: './consulter-users.component.html',
  styleUrls: ['./consulter-users.component.css']
})
export class ConsulterUsersComponent {
  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;
  searchInput: string ='';
  propertyName: string | undefined;
  spinner : boolean = false;
  selectedRole:string='';
  users: any[]=[];
  p:number =1;

  constructor( 
    private observer : BreakpointObserver, 
    private userService: UserServiceService , 
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService, 
    private dialogRef: MatDialog, 
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

    this.getUsersByRole("all");
    
    this.updateValue();
  }


  getUsersByRole(role:string){
    this.selectedRole = role;
    if (this.selectedRole=="all"){
      return this.userService.getAllUsers().subscribe((data: any[]) => {
        this.users = data;
      });
    }
    else{
      return this.userService.getUsersByRole(this.selectedRole).subscribe((data:any[])=>{
        this.users = data;
      })
    }
  }

  //////////////////////////////////////////////////////////
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
    console.log(username);
    this.dialogService.openConfirmDialog(username)
    .afterClosed().subscribe((res:any)=>{
      if(res){
        this.userService.deleteUser(username).subscribe(()=>{
          this.userService.getAllUsers().subscribe((data: any[]) => {
            console.log(data);
            this.users = data;
          });
          this.dialogRef.open(ConfirmDeleteDialogComponent);
        })
      }
    })
  }
  /////////////////////////////////////////////////////////


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

