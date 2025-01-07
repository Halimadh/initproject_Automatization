import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeveloperServiceService } from 'src/app/services/developerService/developer-service.service';

@Component({
  selector: 'app-update-developer',
  templateUrl: './update-developer.component.html',
  styleUrls: ['./update-developer.component.css']
})
export class UpdateDeveloperComponent {

  success: string ='';
  error : string ='';
  spinner : boolean = false;
  clickUpdatePwd : boolean = false;
  dev_id:any;
  dev_username:any;
  dev_name: any;
  dev_email:any;

  UpdateForm= new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    
  })

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    private developerService: DeveloperServiceService
  ){}

  ngOnInit(){
    let vals = this.route.params.subscribe(params => {
      this.dev_id= params ['id'],
      this.dev_username= params ['username'],
      this.dev_name = params ['name'];
      this.dev_email = params['email'];
    })

    this.developerService.getDeveloperById(this.dev_id).subscribe((res:any)=>{
      console.log(res);
      this.UpdateForm= new FormGroup({
        name: new FormControl(res['name']),
        username: new FormControl(res['username']),
        email: new FormControl(res['email']),
        
      })
    })
  }

  checkEmail(email:string) : boolean{
    //checks email patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let testValidity = emailRegex.test(email);
    if (testValidity == false){
      return false;
    }
    else return true;
  }

  updateName( name:string, nameUpdated:string): boolean{
    if(nameUpdated != name && nameUpdated != ' ' && nameUpdated != ''){
      return true;
  }
    else if (nameUpdated == name) return true;
    else return false;
  }

   updateUsername(username:string, usernameUpdated:string){
      if (username != usernameUpdated && usernameUpdated!='' && usernameUpdated!=' '){
       return true
      } else if (usernameUpdated == username) return true;
      else return false;

  }

  updateEmail(userEmail:string, emailUpdated:string){
    if ((emailUpdated != userEmail) && (this.checkEmail(emailUpdated) )){
        return true;
    }
    else if (this.checkEmail(emailUpdated)== false) 
    {
      return false;
    }
    return true;
  }
  onclickUpdate(){
  
      this.success = '';
      this.error = '';
      this.spinner= true;
      
      console.log(this.UpdateForm.value)
      var name = this.UpdateForm.value.name;
      var username = this.UpdateForm.value.username;
      var email = this.UpdateForm.value.email;

      var resName: boolean = this.updateName(this.dev_name,name);
      var resUsername:boolean = this.updateUsername(this.dev_username, username);
      var resEmail:boolean = this.updateEmail(this.dev_email, email);
     
      var updateName : boolean = false;
      var updateUsername : boolean = false;
      var updateEmail : boolean = false;
      
    
    
     
     if (resUsername && username != this.dev_username){
        this.developerService.updateUsername(this.dev_id, username)
        .subscribe((data:any)=>{
         });
        updateUsername = true;
      }
      if (resName && name != this.dev_name ){
        this.developerService.updateName(this.dev_id, name).subscribe((data:any)=>{
          
        });
        updateName = true;
      }
      if (resEmail && email != this.dev_email){
        this.developerService.updateEmail(this.dev_id, email).subscribe((data:any)=>{
          
        });
        updateEmail = true;
      }
     
     if(updateName||updateUsername||updateEmail){
      this.router.navigate(['/admin/consulter-developer']);
     }
      //checks the inputs.
      if (resUsername==false){
        this.error = "Please enter a valid unique username. ";
      }
      else if (resName==false){
        this.error = "Please enter a valid name. ";
      }
      else if (resEmail==false){
        this.error = "Please enter a valid email. ";
      }
      else if ((resUsername || resName || resEmail ) && (updateUsername || updateName || updateEmail) ) {
        this.success = "This developer is updated successfully. ";
      }

  }
  
  fieldsEnabled :boolean = false;

  enableFields() {

    this.fieldsEnabled = true;
  }
}
