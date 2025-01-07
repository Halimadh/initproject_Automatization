import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDivider } from "@angular/material/divider";
import { MatDialog } from "@angular/material/dialog";
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { finalize, tap } from "rxjs";
import Swal from "sweetalert2";
import { HomeService } from "src/app/services/home/home.service";
import { PopUpComponent } from "src/app/pop-up/pop-up.component";
import { AuthGuard } from "src/app/services/AuthGuard/auth.guard";
import { LoginService } from "src/app/services/auth/Auth.service";




@Component({
    selector:"app-home",
    templateUrl:"./home.component.html",
    styleUrls:["./home.component.css"]

})

export class HomeComponent implements OnInit {
  input:any
  token:any
  username:any
  dataRepository:any
  selectedFramwork:string="Angular";
  idFramework:any;
  frameworks:any
  dataVersions:any
  isValidFormSubmitted = false
  resultMsg:string=""
  resp=false
  constructor(protected authService: LoginService,private dialog: MatDialog,private service: HomeService,private spinnerService:NgxSpinnerService,private dialogRef:MatDialog){
    this.token=""
    this.username=""
   
  }
 

    ngOnInit(): void {
      this.service.getRepositories(this.token,this.username).subscribe((response:any)=>{
        this.dataRepository=response;
       console.log(response)
  
      })
  
      this.service.getAllFremawork().subscribe((response:any)=>(
        this.frameworks=response
      ))
      this.submitForm(this.input);
    }
    HomeForm=new FormGroup({
        nameFramework:new FormControl("",
        [Validators.required]),
        version:new  FormControl("" ,
        [Validators.required]),
        repository:new FormControl("",
        [Validators.required]),
        nameProject:new FormControl("" ,
        [Validators.required])
        
    })
  async  submitForm(data : any) {
      this.isValidFormSubmitted = false;
        if (this.HomeForm.valid) {
          this.isValidFormSubmitted = true;
        this.spinnerService.show()

      //  let res=await  this.service.post(data.nameFramework,data.nameProject,data.version)
      //  this.spinnerService.hide()
      //     if(res==true)
      //     {
      //       let dialog = this.dialog.open(PopUpComponent, {
      //         width:'50%'
      //       })
      //     }
      //     this.service.pushingProjectToGitlab(this.token,1,data.nameProject).subscribe((response:any)=>{
      //       console.log(response);
            
      //       })
      }
       }

      selectedframework(event: any){
        this.selectedFramwork=event.target.value
        this.idFramework= this.frameworks.find((x: { name: string; })=>x.name==this.selectedFramwork).id
        console.log(this.idFramework)
        this.service.getAllVersion(this.idFramework).subscribe((response:any)=>{
          this.dataVersions=response;
    
        })
      }

    
      resetForm() {
        // this.alert=true
        this.HomeForm.reset();  
        
        
      }
      get Framework():FormControl{
        return this.HomeForm.get("nameFramework") as unknown as FormControl
      }
      get Version():FormControl{
        return this.HomeForm.get("version") as unknown as FormControl
      }
      get NameProject():FormControl{
        return this.HomeForm.get("nameProject") as unknown as FormControl
      }
      get Repository():FormControl{
        return this.HomeForm.get("repository") as unknown as FormControl
      }
    }