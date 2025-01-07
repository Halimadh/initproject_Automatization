import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  constructor(private authService: LoginService){}
  ngOnInit(): void {
    
  }
  
 registerForm = new FormGroup({
  firstName: new FormControl("" ,
   [Validators.required,
    Validators.minLength(2),
    Validators.pattern('[a-zA-Z].*'),
   ],
   ),
  lastName: new FormControl("",
  [Validators.required,
    Validators.minLength(2),
    Validators.pattern('[a-zA-Z].*'),
   ],
  
   ),
  birthdayDate: new FormControl(""),
  Gender: new FormControl(""),
  email: new FormControl("",
  [Validators.required,
  ]
  ),
  phoneNumber: new FormControl("",
  [Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('[0-9].*'),
   ],),
  position: new FormControl("")
 });
 get FirstName(): FormControl{
  return this.registerForm.get("firstname") as unknown as FormControl;
 }
 get LastName(): FormControl{
  return this.registerForm.get("lastName") as FormControl;
 }
 get Birthday(): FormControl{
  return this.registerForm.get("birthdayDate") as  FormControl;
 }
 get Gender(): FormControl{
  return this.registerForm.get("Gender") as FormControl;
 }
 get Email(): FormControl{
  return this.registerForm.get("email") as FormControl;
 }
 get Phone(): FormControl{
  return this.registerForm.get("phoneNumber") as FormControl;
 }
 get Position(): FormControl{
  return this.registerForm.get("position") as FormControl;
 }

}
