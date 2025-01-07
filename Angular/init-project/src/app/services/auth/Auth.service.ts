import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}


  public headerOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'multipart/form-data',
       'Access-Control-Allow-Origin' : '*',
       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Authorization': `Bearer ${this.getTokenFromLocalStorage()}`
    }),
  };

  API_URL = "https://localhost:7290/api/";

  url(path: string): string {
    return this.API_URL + path;
  }

  async authenticate(username : string, pwd: string): Promise<any> {
    let response;
    try {
      response = await this.http.post(this.url("Login/?username=" + username + "&password=" + pwd), this.headerOptions)
      .toPromise();
        return response;
    } catch (err) {
      throw err;
    }
  }
 sendEmailConfirmation(email:string,username:string,password:string): Promise<any>{
  try{
   let res=this.http.post(this.url("Login/sendEmail?email="+email+"&password="+password+"&username="+username), this.headerOptions)
    .toPromise();
  return res;
  }catch(err){
    throw err;
  }

 }

  storeUserToken(token: string){
    try{
        localStorage.setItem('token', token);
    }catch(err){
      throw err;
    }
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getTokenFromLocalStorage(){
    return localStorage.getItem('token');
  }
  
}
