import { DialogRef } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { FrameworkServiceService } from 'src/app/services/framework/framework-service.service';
import { VersionsService } from 'src/app/services/version/versions.service';
import { DeleteConfirmedComponent } from '../deleteVersion/delete-confirmed/delete-confirmed.component';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.css']
})
export class VersionListComponent {
  @Input() versionList: any[] =[];
  @Input() idFramework: number=0;
  @Input() nameFramework: string='';

  p:number =1;
  searchInput: string ='';
  spinner : boolean = false;
  versionListNotEmpty:boolean=false;
  private subscription: Subscription | undefined;

  constructor( 
    private versionService: VersionsService ,
    private dialogService: DialogService,
    private dialogRef: MatDialog,
    private route: ActivatedRoute
    ){ }

    ngOnInit(){
      
    }
    
    onclickDelete(id:number){
      this.dialogService.openConfirmDeleteVersionDialog(id)
      .afterClosed().subscribe((res:any)=>{
       
        if(res){
          this.versionService.deleteVersion(id).subscribe(()=>{
              return this.versionService.getVersionByFrameworkId(this.idFramework).subscribe((data:any)=>{
               this.versionList = data;
              }),
              this.dialogRef.open(DeleteConfirmedComponent);
            // this.versionService.getAll().subscribe((data: any[]) => {
            //   console.log(data);
            //   this.versionList = data;
             // });
           
          })
        }
      })

    }
}
