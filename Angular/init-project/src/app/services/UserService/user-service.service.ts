import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService{

  public headerOptions = {
    headers: new HttpHeaders({
       'Access-Control-Allow-Origin' : '*',
       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Authorization': `Bearer ${this.getTokenFromLocalStorage()}`
    }),
  };

  constructor(private http: HttpClient) { }

  API_URL= "https://localhost:7290/api/";
  
  url(path: string): string {
    return this.API_URL + path;
  }

  getTokenFromLocalStorage(){
    return localStorage.getItem('token');
  }

  getAllUsers(): any{
    try{
      return this.http.get<any>(this.url("User/getAllUsers"), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  getUserByUsername(username:string) : any{
    try{
      return this.http.get<any>(this.url("User/GetUserByUsername?username="+username), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  getUserByName(name:string) : any{
    try{
      return this.http.get<any>(this.url("User/GetUserByName?name="+name), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  getUserById(id:number) : any{
    try{
      return this.http.get<any>(this.url("User/GetUserById?id="+id), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  getUsersByRole(role:string): any{
    try{
      return this.http.get<any>(this.url("User/GetUsersByRole?role="+role), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  checkUnicityUsername(username:string):any{
    try{
      return this.http.get(this.url("User/CheckUsername?username="+username), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  
  createUser(username:string, name:string, email:string, role: string, password: string): any{
    try{
      return this.http.post(this.url("User/CreateUser?username="+username+"&name="+name+"&password="+password+"&email="+email+"&role="+role), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  
  updateUsername (username: string, usernameUpdated:string):any{
    try{
      return this.http.put(this.url("User/UpdateUsername?username="+username+"&usernameUpdated="+usernameUpdated), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }

  updateEmail (username: string, emailUpdated:string):any{
    try{
      return this.http.put(this.url("User/UpdateEmailUser?username="+username+"&emailUpdated="+emailUpdated), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }

  updateName (username: string, nameUpdated : string):any{
    try{
      return this.http.put(this.url("User/UpdateNameUser?username="+username+"&nameUpdated="+nameUpdated), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }

  updatePassword (username: string, passwordUpdated: string):any{
    try{
      return this.http.put(this.url("User/UpdatePasswordUser?username="+username+"&passwordUpdated="+passwordUpdated), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }

  updateRole (username: string, roleUpdated: string):any{
    try{
      return this.http.put(this.url("User/UpdateRoleUser?username="+username+"&roleUpdated="+roleUpdated), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }
  
  deleteUser(username: string): any{
    try{
      return this.http.delete(this.url("User/DeleteUser?username="+username), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }




}
