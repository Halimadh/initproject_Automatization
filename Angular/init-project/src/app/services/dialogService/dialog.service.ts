import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfimationDialogComponent } from '../../components/backoffice/userManagement/deleteUser/Ask-confirmation-delete/ask-confirmation-delete-dialog.component';
import { AskDeleteFrameworkDialogComponent } from 'src/app/components/backoffice/frameworkManagement/deleteFramework/ask-delete-framework-dialog/ask-delete-framework-dialog.component';

import { DeleteVersionComponent } from 'src/app/components/backoffice/versionsManagement/deleteVersion/delete-version/delete-version.component';
import { AddFrameworkDialogComponent } from 'src/app/components/backoffice/frameworkManagement/addFramework/add-framework-dialog/add-framework-dialog.component';
import { AddVersionComponent } from 'src/app/components/backoffice/versionsManagement/addVersion/add-version/add-version.component';
import { DeleteProjectComponent } from 'src/app/components/backoffice/projectManagement/deleteProject/delete-project/delete-project.component';
import { PopupCreateProjectComponent } from 'src/app/components/test-home/popup-create-project/popup-create-project.component';
import { AddDeveloperToprojectComponent } from 'src/app/components/configure-project/add_developer/page-add-developer/add-developer-toproject/add-developer-toproject.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  selectedFramework : string = '';
  constructor(private dialog: MatDialog) { }

  openConfirmDialog(content: string){
    return this.dialog.open(DeleteConfimationDialogComponent, {
       disableClose: true,
     data : {
        content: content
     }
    });
  }

  openConfirm(content: string){
    return this.dialog.open(DeleteConfimationDialogComponent, {
       disableClose: true,
     data : {
        content: content
     }
    });
  }

  openConfirmDeleteFrameworkDialog(name: string){
     return this.dialog.open(AskDeleteFrameworkDialogComponent, {
       disableClose: true,
      data : {
        frameworkSelected: name
      }
    }); 
  }

  openConfirmAddFrameworkDialog(name:string){
    return this.dialog.open(AddFrameworkDialogComponent, {
      disableClose: true,
      data : {
        frameworkSelected: name
      }
    });
  }

  openConfirmDeleteVersionDialog(id:number){
    return this.dialog.open(DeleteVersionComponent, {
      disableClose: true,
      data : {
        VersionSelected: id
      }
    });
  }
  openConfirmAddDeveloperToprojectComponent(){
    return this.dialog.open(AddDeveloperToprojectComponent);
  }

  openConfirmAddVersionDialog(nameVersion:string, nameFramework:string){
    return this.dialog.open(AddVersionComponent, {
      disableClose: true,
      data : {
        frameworkSelected: nameFramework,
        versionSelected: nameVersion
      }
    });
  }

  
  openConfirmDeleteProjectDialog(name:string){
    return this.dialog.open(DeleteProjectComponent, {
      disableClose: true,
      data : {
        ProjectSelected: name
      }
    });
  }
  
  openPopupDialog(framework: string, version: string, projectName: string){
    return this.dialog.open(PopupCreateProjectComponent, {
      disableClose: true,
      data : {
        frameworkSelected: framework,
        versionSelected: version, 
        projectName: projectName
      }
    }); 
  }

}
