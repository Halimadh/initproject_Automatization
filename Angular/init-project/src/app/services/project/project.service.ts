import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

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

  getProjectByUserId(userId: number): any{
    try{
      return this.http.get<any>(this.url("project/getProjectsById_User?id_user=" + userId), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  getProjectsById(id_project: number): any{
    try{
      return this.http.get<any>(this.url("project/GetProjectsById?id=" + id_project), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  getProjectsByName(nameproject: string): any{
    try{
      return this.http.get<any>(this.url("project/GetProjectsByName?nameProject=" + nameproject), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  getProjectsByRepo(repository:string): any{
    try{
      return this.http.get<any>(this.url("project/GetProjectsByRepository?repoProject=" + repository), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  getAll() : any{
    try{
      return this.http.get<any>(this.url("project/GetAllProjects"), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  getDependenciesbyIdProject(id_project:number) : any{
    try{
      return this.http.get<any>(this.url("Dependencies/GetDependenciesByIdproject?idproject="+id_project), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  getDevProjet():any{
    try{
      return this.http.get<any>(this.url("project/getProjectDev"), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  deleteDependency(id:number): any{
    try{
      return this.http.delete(this.url(" Dependencies/DeleteDependency?id="+id), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
 
  //project/CreatePoject?nameProject=cc&repository=cc&id_users=55
  addProject(nameProject: string, repo:string, id_user:number) : any{
    try{
      return this.http.post(this.url("project/CreatePoject?nameProject="+nameProject+"&repository="+repo+"&id_users="+id_user), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  
  updateStatutProject(id_project: number, newStatut:string):any{
    try{
      return this.http.put(this.url("project/updateStatutProject?id_project="+id_project+"&newstatut="+ newStatut), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }
  updateDescribeProject(id_project: number, description:string):any{
    try{
      return this.http.put(this.url("project/updateDescriptionProject?id_project="+id_project+"&description="+ description), this.headerOptions );
    }
    catch(err){
      return err;
    }
  }
 
  deleteProject(nameProject: string): any{
    try{
      return this.http.delete(this.url("project/DeleteProject?nameProject="+nameProject), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  //Launch project 
  runProject(nameProject:string,type:string):any{
    try{
      return this.http.post(this.url("Run?nameProject="+nameProject),this.headerOptions);
    }catch(err){
      return err;
    }
  }
  
}
