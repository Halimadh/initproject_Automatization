import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigureServiceService {

  public headerOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    }),
  };
  
  
  constructor(private http: HttpClient) { }
  

  API_URL= "https://localhost:7290/api/";
  
  url(path: string): string {
    return this.API_URL + path;
  }
  generatePdf(nameProject:string,nameRepository:string,frameworkBack:string,versionFrameworkBack:string,frameworkFront:string,versionFrameworkFront:string,content:string):any{
    try{
      var authorization = 'Bearer '+sessionStorage.getItem("access_token");

  const headers = new HttpHeaders({ 'Content-Type': 'application/json',
  "Authorization": authorization, responseType : 'blob'});
      return this.http.post(this.url("generatorpdf/GeneratePdf?namepreject="+nameProject+"&namerepository="+nameRepository+"&frameworkBackend="+frameworkBack+"&versionBackend="+versionFrameworkBack+"&frameworkFrontend="+frameworkFront+"&versionFrontend="+versionFrameworkFront+"&content="+content),headers);
    }
    catch(err){
      return err;
    }
  }

}
