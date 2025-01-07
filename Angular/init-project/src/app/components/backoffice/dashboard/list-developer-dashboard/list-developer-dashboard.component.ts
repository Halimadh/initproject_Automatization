import { Component, Input } from '@angular/core';
import { DeveloperServiceService } from 'src/app/services/developerService/developer-service.service';

@Component({
  selector: 'app-list-developer-dashboard',
  templateUrl: './list-developer-dashboard.component.html',
  styleUrls: ['./list-developer-dashboard.component.css']
})
export class ListDeveloperDashboardComponent {
  @Input() id_project: number=0;
  data:any[]=[]
  constructor(private serviceDev:DeveloperServiceService,){}
  ngOnInit(){
    this.getdeveloper()
  }
  getdeveloper(){
    this.serviceDev.getDevelopersByIdproject(this.id_project).subscribe((response:any)=>{
     this.data=response
     console.log(this.data)
    })
  }
}
