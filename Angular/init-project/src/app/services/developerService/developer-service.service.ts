import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeveloperServiceService {


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
  CreateDeveloper(name:string,username:string,email:string): any{
    try{
      return this.http.post<any>(this.url("Developer/CreateDeveloper?name="+name+"&username="+username+"&email="+email), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  AddDeveloperToProject(idproject:number,id_developer:number): any{
    try{
      return this.http.post<any>(this.url("Developer/AddDeveloperToproject?idproject="+idproject+"&idDeveloper="+id_developer), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
 getAllDevelopers(): any{
    try{
      return this.http.get<any>(this.url("Developer/getAllDevelopers"), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  getDevelopersByIdproject(idproject:number): any{
    try{
      return this.http.get<any>(this.url("Developer/getDevelopersByIdproject?idproject="+idproject), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  getDeveloperByUsername(username:string): any{
    try{
      return this.http.get<any>(this.url("Developer/getDeveloperByUsername?username="+username), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  getprojectByIdDeveloper(id_developer:number): any{
    try{
      return this.http.get<any>(this.url("Developer/getprojectByIdDeveloper?id_developer="+id_developer), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  getDeveloperById(id_developer:number): any{
    try{
      return this.http.get<any>(this.url("Developer/getDeveloperById?id="+id_developer), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  updateUsername (id_developer:number, usernameUpdated:string):any{
    try{
      return this.http.put(this.url("Developer/UpdateDeveloperUsername?id_developer="+id_developer+"&usernameUpdate="+usernameUpdated), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }

  updateEmail (id_developer: number, emailUpdated:string):any{
    try{
      return this.http.put(this.url("Developer/UpdateDeveloperEmail?id_developer="+id_developer+"&emailUpdate="+emailUpdated), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }

  updateName (id_developer: number, nameUpdated : string):any{
    try{
      return this.http.put(this.url("Developer/UpdateDeveloperName?id_developer="+id_developer+"&nameUpdate="+nameUpdated), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }

  deleteDeveloper(username: string): any{
    try{
      return this.http.delete(this.url("Developer/DeleteDeveloper?username="+username), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  deleteDeveloperOnProject(username: string,id_project:number): any{
    try{
      return this.http.delete(this.url("Developer/DeleteDeveloperOnProject?username="+username+"&id_project="+id_project), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
    
}
