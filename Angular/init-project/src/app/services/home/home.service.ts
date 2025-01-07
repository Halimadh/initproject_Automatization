import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route } from "@angular/router";
import { Observable,catchError } from "rxjs";

@Injectable({
providedIn:'root'
})
export class HomeService{
    constructor(private http:HttpClient){}

    public headerOptions = {
        headers: new HttpHeaders({
           'Content-TypeContent-Type': 'multipart/form-data',
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

post(frameworkback:string,frameworkfront:string, versionBack: string,versionFront: string,nameProject : string,idUser:any,email:string,repo:any): any{
      let response;
      try {
        response = this.http.post(this.url("Cmd/ExecuteCmd?framework_back="+frameworkback+"&framework_front="+frameworkfront+"&version_back="+versionBack+"&version_front="+versionFront+"&nameProject="+nameProject+"&idUser="+idUser+"&email="+email+"&repository="+repo), this.headerOptions)
          return  response;
  
      } catch (err) {
        return err;
      }
  }
  getTokenFromLocalStorage(){
    return localStorage.getItem('token');
  }
  
  getRepositories(accesToken:string,username:string):Observable<any>{
    
      return this.http.get<any>(this.url("GitLab/GetRepositories?accessToken="+accesToken+"&username="+username))
    
  }
  getAllFremawork():Observable<any>{
    
      return this.http.get<any>(this.url("Framework/GetAllFrameworks"));
   
  }
  
  getAllVersion(idframework:any):Observable<any>{
    
    return this.http.get<any>(this.url("Framework/GetVersionByFramworkId?id="+idframework));
 
}
pushingProjectToGitlab(tokenAcess:string,projectId:any,nameProject:string ){
  return this.http.post<any>(this.url("Gitlab/PushProjectToGitlab?personalAccessToken="+ tokenAcess +"&projectId="+projectId+"&project="+nameProject),this.headerOptions)
}
  
}
