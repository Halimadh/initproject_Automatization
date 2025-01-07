import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';
import { DeveloperServiceService } from 'src/app/services/developerService/developer-service.service';

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.css']
})
export class AddDeveloperComponent {
  AddForm= new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    })
  
  drawerMode: string="";


  constructor(
    private developerService: DeveloperServiceService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  )
  {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.drawerMode = 'open';
      this.cdRef.detectChanges();
    }, 0);
  }
  
  checkemail(data:any): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(data.email);
  }

  checkAllRequiredFields(data: any) : boolean{
    if (data.name ==null){
      return false;
    }
    else if (data.username == null){
      return false;
    }
    else if (data.email == null){
      return false;
    }
    return true;
  }

  checkValidity(data:any): boolean{
    if ( (this.checkAllRequiredFields(data)) && (this.checkemail(data))){
      return true;
    }
    return false;
  }

  response: string='';
  onclickAdd(data:any){
    if( this.checkValidity(data)){
      this.developerService.CreateDeveloper(data.name,data.username,data.email).subscribe(()=>{
        this.router.navigate(['/admin/consulter-developer']);
      })
    }else{
    if (this.checkAllRequiredFields(data)==false){
      this.response = "Please fill in all the required fields. ";
    } 
    else if (this.checkemail(data)==false){
      this.response="Please enter a valid email. ";
    }
    }
  }
}
