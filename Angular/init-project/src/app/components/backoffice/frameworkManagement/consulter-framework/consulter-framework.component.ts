import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FrameworkServiceService } from '../../../../services/framework/framework-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFrameworkDialogComponent } from '../addFramework/add-framework-dialog/add-framework-dialog.component';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { ConfirmDeleteFrameworkComponent } from '../deleteFramework/confirm-delete-framework/confirm-delete-framework.component';
import { Router } from '@angular/router';
import { AddVersionComponent } from '../../versionsManagement/addVersion/add-version/add-version.component';

@Component({
  selector: 'app-consulter-framework',
  templateUrl: './consulter-framework.component.html',
  styleUrls: ['./consulter-framework.component.css']
})
export class ConsulterFrameworkComponent {
  @Input() selectedFramework : string ='';
  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;

  searchInput: string ='';
  p:number =1;
  
  frameworks : any[] = [];
  constructor(
    private observer : BreakpointObserver,
    private frameworkService:FrameworkServiceService,
    private dialogRef: MatDialog, 
    private dialogService: DialogService,
    private router: Router
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
      this.frameworkService.getAll().subscribe((data: any[]) => {
        this.frameworks = data;
      });
    }    

    setSelectedFramework(selectedName : string){
      this.selectedFramework = selectedName;
    }
    onclickAddFramework(){
      this.dialogRef.open(AddFrameworkDialogComponent);
    }
    onclickAddVersion(name:string){
      this.dialogRef.open(AddVersionComponent);
    }
    onclickSeeVersions(){
      this.router.navigate(['/admin/versionByFramework']);
    }

    onclickDeleteFramework(name : string){
      console.log(name);
      this.dialogService.openConfirmDeleteFrameworkDialog(name)
      .afterClosed().subscribe((res:any)=>{
        console.log(res);
        if(res){
          this.frameworkService.deleteFramework(name).subscribe((res:any)=>{
            console.log(res);
            this.frameworkService.getAll().subscribe((data: any[]) => {
              console.log(data);
              this.frameworks = data;
            });
            this.dialogRef.open(ConfirmDeleteFrameworkComponent);
          })
        }
      })
    }
}
