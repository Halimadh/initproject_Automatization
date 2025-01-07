import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../auth/Auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class Service {
    API_URL= "https://localhost:7290/api/";
  
    
    url(path: string): string {
      return this.API_URL + path;
    }
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

  getTokenFromLocalStorage(){
    return localStorage.getItem('token');
  }

 
postCreateApp(framework:string, version:any,nameProject : string,repositoryName:string ): any{
      let response;
      try {
        response = this.http.post(this.url("Cmd/ExecuteCmd?framework="+framework+"&version="+version+"&nameProject="+nameProject), this.headerOptions)
          return  response;
  
      } catch (err) {
        return err;
      }
  }
  
}