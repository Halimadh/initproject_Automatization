import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UserServiceService } from '../../../services/UserService/user-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../../services/dialogService/dialog.service';
import { ConfirmDeleteDialogComponent } from '../userManagement/deleteUser/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-consulter-emails',
  templateUrl: './consulter-emails.component.html',
  styleUrls: ['./consulter-emails.component.css']
})
export class ConsulterEmailsComponent {
  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;

  searchInput: string ='';
  userList: any[] = [];
  p:number =1;


  constructor( 
    private observer : BreakpointObserver, 
    private userService: UserServiceService ,
    private dialogRef: MatDialog, 
    private dialogService: DialogService,
    private router: Router
    ){ }

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
      this.getAllUsers();
    }  

    getAllUsers(){
      this.userService.getAllUsers().subscribe((data: any[]) => {
        this.userList = data;
      });
    }

    //sidebar management
    openSideBar(){
      this.sidenav.open();
    }
    closeSideBar(){
      this.sidenav.close();
    }

    onclickDelete(username : string){
      console.log(username);
      this.dialogService.openConfirmDialog(username)
      // .afterClosed().subscribe((res:any)=>{
      //   if(res){
      //     this.userService.deleteUser(username).subscribe(()=>{
      //       this.dialogRef.open(ConfirmDeleteDialogComponent);
      //     })
      //   }
      // })
       
    }
    
    onclickModify(username: string, id:number, name:string, email:string, role:string){
      this.router.navigate(['/admin/update-user', username, id, name, email, role]);
    }
  
    onclickSee(username: string, id:number, name: string, email:string, role:string){
      this.router.navigate(['/admin/see-details-user', username, id, name, email,role]);
    }
}
