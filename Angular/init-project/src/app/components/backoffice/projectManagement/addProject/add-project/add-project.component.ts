import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { AddConfirmedProjectComponent } from '../add-confirmed-project/add-confirmed-project.component';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  nameProject: string='';
  token: string ='';
  username: string='';
  repo: string='';
  repos : any[]=[];
  id_user: any;

  ngOnInit(){
   let vals = this.route.params.subscribe(params =>{
    this.id_user = params['iduser'];
    console.log(this.id_user);
   })
  }
constructor(
  private homeService: HomeService,
  public dialogRef: MatDialog,
  private projectService: ProjectService,
  private route: ActivatedRoute
  ){}

closeDialog() {
  this.dialogRef.closeAll();
}


alert : string = '';
onclick(){
  if ((this.nameProject == '')||(this.repo=='')||(this.id_user=='')){
    this.alert = 'Please fill in all the fields. ';
  }
  else{
    this.projectService.addProject(this.nameProject,this.repo,this.id_user).subscribe((res:any)=>{
      if (res){
        this.dialogRef.open(AddConfirmedProjectComponent);
      }
      else{
        this.alert= 'User not found. ';
      }
    });
    
  }

}

}
