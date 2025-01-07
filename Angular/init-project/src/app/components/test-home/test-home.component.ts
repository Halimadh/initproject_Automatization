import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { FrameworkServiceService } from 'src/app/services/framework/framework-service.service';
import { VersionsService } from 'src/app/services/version/versions.service';
import { LoginService } from 'src/app/services/auth/Auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Service } from 'src/app/services/cmdService/service.component';
import { MatSidenav } from '@angular/material/sidenav';
import { PopupCreateProjectComponent } from './popup-create-project/popup-create-project.component';


@Component({
  selector: 'app-test-home',
  templateUrl: './test-home.component.html',
  styleUrls: ['./test-home.component.css']
})
export class TestHomeComponent {
  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;
  versionSelected : string ='';
  constructor(

    private frameworkService: FrameworkServiceService,
    private versionService: VersionsService,
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialog, 
    protected authService:LoginService,
    private sharedService: DialogService,
    private spinnerService:NgxSpinnerService,
    private dialog: MatDialog
  ){}

  ngOnInit(){
     this.HomeForm = this.formBuilder.group({
      frameworkBack : ['', Validators.required],
      frameworkFront: ['', Validators.required],
      versionBack: ['', Validators.required],
      versionFront: ['', Validators.required],
      project_name:['',Validators.required],
      repository_name:['',Validators.required]

        })
    this.getFramworksList();
   
  }

  frameworkList : any[] =[];
  framework_back:any[]=[];
  framework_front:any[]=[];
  versionsList : any[] =[];
  versionsListBack : any[] =[];

  HomeForm = new FormGroup({
    frameworkBack: new FormControl(),
    frameworkFront: new FormControl(),
    versionBack :new FormControl(),
    versionFront :new FormControl(),
    project_name:new FormControl(),
    repository_name:new FormControl()
  })

getFramworksList(){
  this.spinnerService.show();
  this.frameworkService.getAll().subscribe((data:any[])=>{
    this.frameworkList = data;
    for(var elt of this.frameworkList){
      if(elt.type=="framework_back"){
        this.framework_back.push(elt)
      }else {
        this.framework_front.push(elt)
      }
    }
    console.log(this.framework_back);
  })
  this.spinnerService.hide()
}

getVersionsListByFramework(){
  this.spinnerService.show()
  var frameworkName = this.HomeForm.value.frameworkFront;
   this.frameworkService.getIdFrameworkByName(frameworkName).subscribe((data:any)=>{
      this.frameworkService.getAllVersionByFramework(data.id).subscribe((data:any[])=>{
          this.versionsList = data;
      })
    })
  //   this.versionService.getVersionByFrameworkId(data.id).subscribe((data:any[])=>{
  //     this.versionsList = data;
  //   })
  // })
  this.spinnerService.hide()
}
getVersionsListByFrameworkBack(){
  this.spinnerService.show()
  var frameworkName = this.HomeForm.value.frameworkBack;
   this.frameworkService.getIdFrameworkByName(frameworkName).subscribe((data:any)=>{
    this.frameworkService.getAllVersionByFramework(data.id).subscribe((data:any[])=>{
          this.versionsListBack = data;
        })
    })
  //   this.versionService.getVersionByFrameworkId(data.id).subscribe((data:any[])=>{
  //     this.versionsList = data;
  //   })
  // })
  this.spinnerService.hide()
}
  alert : string = "";

submitForm(){
  
     if ((this.HomeForm.value.frameworkFront == '')||(this.HomeForm.value.frameworkBack == '')  || (this.HomeForm.value.versionBack == '')||(this.HomeForm.value.versionFront == '')){
      this.alert= "Please fill in the required fields.";
    }
    else { 
      var frameworkBackSelected = this.HomeForm.value.frameworkBack;
      var frameworkFrontSelected = this.HomeForm.value.frameworkFront;
      var versionBackSelected = this.HomeForm.value.versionBack;
      var versionFrontSelected = this.HomeForm.value.versionFront;
    

      const dialogConfig: MatDialogConfig = {
        data: { frameworkBack: frameworkBackSelected,frameworkFront:frameworkFrontSelected, versionBack: versionBackSelected,versionFront:versionFrontSelected},
      };
      /*console.log(dialogConfig.data.framework);*/
          
      // const version = this.HomeForm.value.version;
      // this.versionSelected = versionForm;
      this.dialogRef.open(PopupCreateProjectComponent, dialogConfig);
    }
  }   
    
  getErrorMessage() {
    if (this.NameProject.hasError('required')) {
      return 'You must enter a value';
    }

    return this.NameProject.hasError('') ? 'Not a valid email' : '';
  }

  resetForm(){
    this.HomeForm.reset();
  }

  get NameProject():FormControl{
    return this.HomeForm.get("project_name") as unknown as FormControl
  }
  get Repository():FormControl{
    return this.HomeForm.get("repository_name") as unknown as FormControl
  }
}
