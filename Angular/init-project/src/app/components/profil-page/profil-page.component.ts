import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent {
  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;
  res:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private observer : BreakpointObserver, 
    private dialogService: DialogService,
    private dialogRef: MatDialog
  ){}

  username: any;
  id: any;
  name: any;
  role: any;
  email: any;

 

  
  ngOnInit(){
   
    this.res=localStorage.getItem('userDetails')
    var r=JSON.parse(this.res)
   
      this.username = r.username
      this.id = r.id
      this.name = r.name
      this.email = r.email;
      this.role=r.role;
      // this.role = params['role'];
      
  
    
    
  }

  //to handle the error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value for '@transform': 'void'. Current value: 'open'.
  transform= 'void';
 
  ngAfterViewInit() {
    setTimeout(() => {
      this.transform = 'open';
      this.cdr.detectChanges(); 
    }, 0);
      this.observer.observe(['(max-width: 925px)']).subscribe((res:any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
     
    
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
