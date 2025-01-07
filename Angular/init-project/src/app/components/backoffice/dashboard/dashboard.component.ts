import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Chart } from 'chart.js/auto';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';
import { DeveloperServiceService } from 'src/app/services/developerService/developer-service.service';
import { ProjectService } from 'src/app/services/project/project.service';
class project_dev{
  name_projet:string=""
  list_developer:string[]=[]
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;
  p:number =1;
  searchInput: string ='';
  projects:any
  developers:any
  projectFinist:number=0
  projectInprogresss:number=0
  projectStopped:number=0
  nombre_project:number=0
  nombre_dev:number=0
  nombre_user:number=0
  nb_project2020:number=0
  nb_project2021:number=0
  nb_project2022:number=0
  nb_project2023:number=0
  nb_project2024:number=0
  data:any[]=[]
  dateData:any[]=[]
  dateInterval:any[]=["2020","2021","2022","2023","2024"]
  propertyName: string | undefined;
  listprojet_dev:project_dev[]=[]
  list:any
 constructor( 
    private observer : BreakpointObserver,
    private service:ProjectService,
    private serviceDev:DeveloperServiceService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private srv_user:UserServiceService
 
    ){ }


     //to handle the error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value for '@transform': 'void'. Current value: 'open'.
  transform= 'void';
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 925px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
   this.getProject(),
   this.getDev()
   this.getUsers()
}
 
  getProject(){

    // var _projet_dev=new project_dev()
    this.service.getAll().subscribe((response:any)=>{
      this.projects=response
      this.nombre_project=this.projects.length
      for(let i=0;i<this.projects.length;i++){
        if(this.projects[i].statut=='Create'||this.projects[i].statut=='Active'||this.projects[i].statut=='in progress'){
          this.projectInprogresss+=1
         
        }else if(this.projects[i].statut=='stopped'){
          this.projectStopped+=1
        }else{
          this.projectFinist+=1
        }
      }

      for(let i=0;i<this.projects.length;i++){
        if(this.datePipe.transform(this.projects[i].date, 'yyyy')as string =="2020"){
          this.nb_project2020+=1

        }
        if(this.datePipe.transform(this.projects[i].date, 'yyyy')as string =="2021"){
          this.nb_project2021+=1
        }
        if(this.datePipe.transform(this.projects[i].date, 'yyyy')as string =="2022"){
          this.nb_project2022+=1
        }
        if(this.datePipe.transform(this.projects[i].date, 'yyyy')as string =="2023"){
          this.nb_project2023+=1
        }
        if(this.datePipe.transform(this.projects[i].date, 'yyyy')as string =="2024"){
          this.nb_project2024+=1
        }
       
      }
      this.data.push(this.projectFinist)
      this.data.push(this.projectInprogresss)
      this.data.push(this.projectStopped )
      this.dateData.push(this.nb_project2020)
      this.dateData.push(this.nb_project2021)
      this.dateData.push(this.nb_project2022)
      this.dateData.push(this.nb_project2023)
      this.dateData.push(this.nb_project2024)
      this.graphFunctionPie(this.data)
      this.graphFunctionBar(this.dateData,this.dateInterval)
    })
    
   }
   graphFunctionPie(_data:any){
    new Chart("myPie", {
      type: 'pie',
      data: {
        labels: ['Project Finish', 'Project in progress', 'Project Stopped'],
        datasets: [{
          label: '# of Votes',
          data:_data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  graphFunctionBar(dateData:any,dateInterval:any){
    new Chart("myBar", {
      type: 'line',
      data: {
        labels: dateInterval,
        datasets: [{
          label: 'Number of project by years',
          data: dateData,
          fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
    // borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}
getDev(){
  this.serviceDev.getAllDevelopers().subscribe((response:any)=>{
    this.developers =response
    this.nombre_dev=this.developers.length
  })
 }
 getUsers(){
   this.srv_user.getAllUsers().subscribe((response:any)=>{
    this.nombre_user=response.length
   })
 }
//  getAlldevProject(){
//   this.service.getDevProjet().subscribe((response:any)=>{
//     console.log(response)
//    })
//  }



 
  //sidebar management
  openSideBar(){
    this.sidenav.open();
  }
  closeSideBar(){
    this.sidenav.close();
  }
  updateValue(): void {
    this.propertyName = 'new value';
    this.cdr.detectChanges();
  } 
 
}
