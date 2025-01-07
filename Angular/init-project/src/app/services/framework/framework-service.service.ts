import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../auth/Auth.service';

@Injectable({
  providedIn: 'root'
})
export class FrameworkServiceService {
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
  
  getAll(): any{
    try{
      return this.http.get<any>(this.url("Framework/GetAllFrameworks"), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  // getCountVersions(idFramework : number) : any{
  //   try{
  //     return this.http.get<any>(this.url("Version/CountVersionsPerFramework?idFramework=" +idFramework), this.headerOptions);
  //   }
  //   catch(err){
  //     return err;
  //   }
  // }

  addFramework(nameFramework: string,versionName:string) : any{
    try{
      return this.http.post<any>(this.url("Framework/AddFramewrok?name="+ nameFramework+"&versionName="+versionName), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  getIdFrameworkByName(name:string):any{
    try{
      return this.http.get(this.url("Framework/GetFrameworkByName?name="+ name), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  getFrameworkById(id: number): any{
    try{
      return this.http.get<any>(this.url("Framework/GetFrameworkById?id="+ id), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  deleteFramework(nameFramework: string) : any{
    try{
      return this.http.delete<any>(this.url("Framework/DeleteFramework?name="+ nameFramework), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  getAllVersionByFramework(idFramework:number):any{
    try{
      return this.http.get<any>(this.url("Framework/GetVersionByFramworkId?id="+ idFramework), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
}
