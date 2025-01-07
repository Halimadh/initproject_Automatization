import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-add-confirmed-project',
  templateUrl: './add-confirmed-project.component.html',
  styleUrls: ['./add-confirmed-project.component.css']
})
export class AddConfirmedProjectComponent {
  constructor(private dialogRef : MatDialog, private projectService: ProjectService){}

  closeDialog() {
    this.projectService.getAll().subscribe();
    this.dialogRef.closeAll();
  }
}
