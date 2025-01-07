import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FrameworkServiceService } from 'src/app/services/framework/framework-service.service';
import { VersionsService } from 'src/app/services/version/versions.service';
import { AddVersionComponent } from '../addVersion/add-version/add-version.component';

@Component({
  selector: 'app-get-version-by-framework',
  templateUrl: './get-version-by-framework.component.html',
  styleUrls: ['./get-version-by-framework.component.css']
})
export class GetVersionByFrameworkComponent {
  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;
  searchInput: string ='';
  propertyName: string | undefined;

  selectedFrameworkName : string = '';
  selectedFrameworkId: number=-1;
  versions: any[]=[];
  frameworks: any[]=[];
  constructor( 
    private observer : BreakpointObserver, 
    private versionService: VersionsService , 
    private cdr: ChangeDetectorRef, 
    private frameworkService: FrameworkServiceService,
    private dialogRef: MatDialog
    ){ }
    ngAfterViewInit(){
      console.log(this.selectedFrameworkName);
      this.observer.observe(['(max-width: 925px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
      this.getAllFrameworks();     
      // this.selectedFrameworkName = "all";
      // this.getAll();
      // console.log(this.selectedFrameworkName);
      this.getVersionByFramework(1,"Web Api Asp.net")
    }
  getVersionByFramework(idFramework: number, nameFramework:string){
  this.selectedFrameworkId = idFramework;
  this.selectedFrameworkName = nameFramework;
  return this.versionService.getVersionByFrameworkId(idFramework).subscribe((data:any)=>{
    this.versions = data;
    
  })
  // if (this.selectedFrameworkName == 'all'){
  //   return this.getAll();
  // }
  // else{
  //   return this.versionService.getVersionByFrameworkId(idFramework).subscribe((data:any)=>{
  //     this.versions = data;
      
  //   })
  //  }   
}

getAllFrameworks(){
  if (this.selectedFrameworkName == 'all'){
    return this.getAll();
  }
  else{
    return this.frameworkService.getAll().subscribe((data:any)=>{
      this.frameworks = data;
    });
  }
  
}
getFrameworkById(id:number){
  return this.frameworkService.getFrameworkById(id).subscribe();
}
getAll(){
  return this.versionService.getAll().subscribe((data:any)=>{
    this.versions = data;
  })
}

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

onclickAddVersion(){

  this.dialogRef.open(AddVersionComponent);
}



}
