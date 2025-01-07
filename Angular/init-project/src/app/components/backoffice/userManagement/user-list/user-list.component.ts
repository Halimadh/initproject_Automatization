import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { UserServiceService } from '../../../../services/UserService/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../../../services/dialogService/dialog.service';
import { Router } from '@angular/router';
import { ConfirmDeleteDialogComponent } from '../deleteUser/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input() role:string='';
  @Input() userList: any[] =[];

  searchInput: string ='';
  propertyName: string | undefined;
  p:number =1;
  spinner : boolean = false;
  constructor( 
    private userService: UserServiceService , 
    private dialogRef: MatDialog, 
    private dialogService: DialogService,
    private router: Router
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
      console.log(username);
      this.dialogService.openConfirmDialog(username)
      .afterClosed().subscribe((res:any)=>{
        if(res){
          this.userService.deleteUser(username).subscribe(()=>{
            this.userService.getAllUsers().subscribe((data: any[]) => {
              console.log(data);
              this.userList = data;
            });
            this.dialogRef.open(ConfirmDeleteDialogComponent);
          })
        }
      })
    }
}
