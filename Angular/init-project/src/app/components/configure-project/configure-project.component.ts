import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { DeveloperServiceService } from 'src/app/services/developerService/developer-service.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { AddDependenceComponent } from './add-dependency/add-dependence/add-dependence/add-dependence.component';
import { AddDeveloperToprojectComponent } from './add_developer/page-add-developer/add-developer-toproject/add-developer-toproject.component';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-configure-project',
  templateUrl: './configure-project.component.html',
  styleUrls: ['./configure-project.component.css']
})
export class ConfigureProjectComponent implements  OnInit{
  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;
  searchInput: string ='';
  propertyName: string | undefined
  data:any
  select:string=''
  id_project:any
  _statut:any
  _description:string=''
  isDeveloper:boolean=true
  dataSelect_Developer:any[]=[]
  dataSelect_Dependency:any[]=[]
  constructor(private config: NgSelectConfig,
    private projectService:ProjectService,
    private developerService:DeveloperServiceService,
    public route: ActivatedRoute, 
    public router: Router ,
    private cdr: ChangeDetectorRef,
    private dialogRef:MatDialog) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
}
ngOnInit(): void {
  let vals = this.route.params.subscribe(params => {
    this.id_project= params ['id_project'];
    // this._statut= params ['_statut'];
    // this._description= params ['_description'];
    
})
this.getProjectsById(this.id_project)
// this.getDataSelection('developers')
this.getdependences()
this.getdevelopers()
}
getDataSelection(selection:string){
this.select=selection
if(this.select=="developers"){
  this.getdevelopers()
  }else{
    this.getdependences()
  }
}
getdevelopers(){
  this.developerService.getDevelopersByIdproject(this.id_project).subscribe((res:any[])=>{
    this.dataSelect_Developer=res
    this.isDeveloper=true
   //  console.log(this.dataSelect)
   })
}
getdependences(){
  this.projectService.getDependenciesbyIdProject(this.id_project).subscribe((res:any[])=>{
    this.dataSelect_Dependency=res
    this.isDeveloper=false
    // console.log(this.dataSelect)
          
   })
}
updateStatutProject(){
    this.projectService.updateStatutProject(this.id_project,this._statut).subscribe((data:any)=>{
  })
}
getProjectsById(id_project:number):any{
  this.projectService.getProjectsById(id_project).subscribe(
    (res:any)=>{
      this.data=res
      this._description=this.data.description
      this._statut=this.data.statut
      // console.log(this.data)  
    })
 }
updateValue(): void {
  this.propertyName = 'new value';
  this.cdr.detectChanges();
}
onclickAddDeveloper(){
  this.dialogRef.open(AddDeveloperToprojectComponent,{
    data:{
      _idproject:this.id_project,
    }
  }).afterClosed().subscribe((data:any)=>{
    this.getdevelopers()
   
  })
}
onclickAddDependency(){
  this.dialogRef.open(AddDependenceComponent,{
    data:{
      _idproject:this.id_project,
    }
  }).afterClosed().subscribe((data:any)=>{
    this.getdependences()
   
  });
}
addDescrib(){
  this.projectService.updateDescribeProject(this.id_project,this._description).subscribe(()=>{
    this.getProjectsById(this.id_project)
  }
)}

generatepdf(){
  var docDefinition = {
    content: [
      { text: 'Description du projet',margin:10, style: 'header' },
      { text:this._description,margin:10,style :'desc'},
      { text:"Information sur le projet",margin:10,style :'info'},
      {
        
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1, 
          widths: [ '*', '*','*', '*' ],
  
          body: [
            ['Nom projet',this.data.nameProject ],
            ['Repository gitlab',this.data.repository],
            ['framework backend',this.data.framework_back],
            ['framework frontend',this.data.framework_front],
            ['version backend',this.data.version_back],
            ['version frontend',this.data.version_front],
          
            
          
        ]
        }
      },
      { text:"Listes des développeurs",margin:10,style:'title_dev'},
      {
        
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1, 
          widths: [ '*', '*','*', '*' ],
  
          body: [
            ['Name', 'Username', 'Email' ],
            ...this.dataSelect_Developer.map(intervObj => 
                [intervObj.name, intervObj.username,intervObj.email]
          )
        ]
        }
      },
      { text:"Listes des dépendances",margin:10,style:'title_dep'},
      {table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1, 
        widths: [ '*', '*','*', '*' ],

        body: [
          ['Name', 'Version', 'Type' ],
          ...this.dataSelect_Dependency.map(d => 
              [d.name, d.version,d.type]
        )
      ]
      }}

      ],
  
    styles: {
      header: {
        fontSize: 14,
        bold: true
      },
      desc:{
        fontsize:16,
        bold:false,

      },
      title_dev:{
        fontSize: 14,
        bold: true

      },
      title_dep:{
        fontSize: 14,
        bold: true
      },
      info:{
        fontSize: 14,
        bold: true
      }
    
    },
    
  };

  pdfMake.createPdf(docDefinition).open();

}
}
