import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { HomeService } from 'src/app/services/home/home.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { PopupMessageComponent } from '../popup-message/popup-message.component';

@Component({
  selector: 'app-popup-create-project',
  templateUrl: './popup-create-project.component.html',
  styleUrls: ['./popup-create-project.component.css']
})
export class PopupCreateProjectComponent {
  frameworkBack: string='';
  frameworkFront:string='';
  versionBack:string='';
  versionFront:string='';
  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private projectservice:ProjectService,
    private dialogRef : MatDialog,
    private spinnerService:NgxSpinnerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.frameworkBack=data.frameworkBack
      this.frameworkFront=data.frameworkFront
      this.versionBack=data.versionBack
      this.versionFront=data.versionFront
    }
    popupForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      repositoryName:['',Validators.required]
    });
  
    isLinear = false;
    repositories : any[] =[];
    response : string ='';
    check : boolean = false;
    firstStepComplete = false;
    secondStepComplete = false;
    hint: string ='';
    begin:boolean =false;
    nameprojectExist:boolean=false;
    repositoryExist:boolean=false;

  
    closeDialog(){
      if(this.begin){
        // open dialog confirmation (later)
      }
      this.dialogRef.closeAll();
    }
   


  async generateProject(){
    this.begin=true;
    var projectName = this.popupForm.value.projectName as string;
    var repositoryName=this.popupForm.value.repositoryName as string;
    // var repo = this.pushGitlabForm.value.repo;
   this.response='';
    let user:any =localStorage.getItem('userDetails');
    let obj =JSON.parse(user);
    this.hint = 'This action may take a while.. Please wait..';
    this.projectservice.getProjectsByName(projectName).subscribe((response:any)=>{
          console.log(response)
          if(response==false){
           this.projectservice.getProjectsByRepo(repositoryName).subscribe(async (response:any)=>{
            if(response==false){
                if (projectName != '' && projectName != null && projectName != undefined && repositoryName != '' && repositoryName!= null && repositoryName != undefined){
                   this.check = true;
                   this.spinnerService.show()
                   await this.homeService.post(this.frameworkBack,this.frameworkFront,this.versionBack,this.versionFront, projectName,obj.id,obj.email,repositoryName).subscribe((response:any)=>{
                   this.spinnerService.hide()
                   if(response==true)
                    {
                       let dialog = this.dialog.open(PopUpComponent, {
                        width:'50%'
                     })
                    }
                   });
    }
            }else{
              const dialogConfig: MatDialogConfig = {
                      data: {content:"please change the repository name, this name already exists"},
                    };
                    this.dialogRef.open(PopupMessageComponent, dialogConfig);
            }
           })
          }else{
            const dialogConfig: MatDialogConfig = {
                    data: {content:"please change the project name, this name already exists"},
                  };
                  this.dialogRef.open(PopupMessageComponent, dialogConfig);
          }
          
        })
   
    
  
    // console.log(this.repositoryExist)
    
    // if(this.nameprojectExist==false && this.repositoryExist==false){
    //   if (projectName != '' && projectName != null && projectName != undefined && repositoryName != '' && repositoryName!= null && repositoryName != undefined){
    //     this.check = true;
    //     console.log('principal')
    //     this.spinnerService.show()
    //      await this.homeService.post(this.frameworkBack,this.frameworkFront,this.versionBack,this.versionFront, projectName,obj.id,obj.email,repositoryName).subscribe((response:any)=>{
    //       this.spinnerService.hide()
    //       if(response==true)
    //         {
    //           let dialog = this.dialog.open(PopUpComponent, {
    //             width:'50%'
    //           })
    //         }
    //      });
    // }
    // }
    // else if(this.nameprojectExist==true && this.repositoryExist==false ){
     
    //     const dialogConfig: MatDialogConfig = {
    //       data: {content:"please change the project name, this name already exists"},
    //     };
    //     this.dialogRef.open(PopupMessageComponent, dialogConfig);
    // }else{
      
    //     const dialogConfig: MatDialogConfig = {
    //       data: {content:"please change the repository name, this name already exists"},
    //     };
    //     this.dialogRef.open(PopupMessageComponent, dialogConfig);
      
    // }
    
}



}
