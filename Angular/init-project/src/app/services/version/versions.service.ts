import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionsService {

  constructor(private http: HttpClient) { }

  API_URL= "https://localhost:7290/api/";

  
  url(path: string): string {
    return this.API_URL + path;
  }
  public headerOptions = {
    headers: new HttpHeaders({
       'Access-Control-Allow-Origin' : '*',
       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'

    }),
  };
  


  getVersionByFrameworkId(idFramework : number) : any{
      try{
        return this.http.get<any>(this.url("Version/GetAllVersionsByFramework?idFramework="+idFramework));
      }
      catch(err){
        return err;
      }
  }

  getAll(): any{
    try{
      return this.http.get<any>(this.url("Version/GetAllVersions"), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  
  addVersion(nameVersion: string, idFramework:number) : any{
    try{
      return this.http.post(this.url("Version/AddVersion?name="+nameVersion+"&idFramework="+idFramework), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }

  deleteVersion(id: number) :any{
    try{
      return this.http.delete(this.url("Version/DeleteVersion?id="+ id), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
  deleteVersionByFramework(idFramework: number) :any{
    try{
      return this.http.delete(this.url("Version/DeleteVersionByFramework?idframework="+ idFramework), this.headerOptions);
    }
    catch(err){
      return err;
    }
  }
}
