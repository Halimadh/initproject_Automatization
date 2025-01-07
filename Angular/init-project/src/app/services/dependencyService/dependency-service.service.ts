import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DependencyServiceService {

  public headerOptions = {
    headers: new HttpHeaders({
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
  
  createDependency(name:string,version:string,type:string,idproject:number): any{
    try{
      return this.http.post<any>(this.url("Dependencies/CreateDependency?name="+name+"&version="+version+"&type="+type+"&idproject="+idproject), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  getAllDependencies(): any{
    try{
      return this.http.get<any>(this.url("Dependencies/GetAllDependencies"), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  
  getDependenciesByIdproject(idproject:number): any{
    try{
      return this.http.get<any>(this.url("Dependencies/GetDependenciesByIdproject?idproject="+idproject), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  getDependencyById(id_developer:number): any{
    try{
      return this.http.get<any>(this.url("Dependencies/GetDependencyById?id="+id_developer), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  

  updatename (id:number, nameUpdated:string):any{
    try{
      return this.http.put(this.url("Dependencies/UpdateDependencyName?id="+id+"&updateName="+nameUpdated), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }

  updateVersion (id:number, versionNew:string):any{
    try{
      return this.http.put(this.url("Dependencies/UpdateDependencyVersion?id="+id+"&updateVersion="+versionNew), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }
  updateType (id:number, typeNew:string):any{
    try{
      return this.http.put(this.url("Dependencies/UpdateDependencyType?id="+id+"&updateType="+typeNew), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }

  
  deleteDependency(id:number): any{
    try{
      return this.http.delete(this.url("Dependencies/DeleteDependency?id="+id), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  


}
