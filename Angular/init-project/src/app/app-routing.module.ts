import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConsulterUsersComponent } from './components/backoffice/userManagement/consulter-users/consulter-users.component';
import { HomeComponent } from './components/home/home.component';
import { AddUserComponent } from './components/backoffice/userManagement/add-user/add-user.component';
import { ConsulterFrameworkComponent } from './components/backoffice/frameworkManagement/consulter-framework/consulter-framework.component';
import { UpdateUserComponent } from './components/backoffice/userManagement/update-user/update-user/update-user.component';
import { SeeDetailsUserComponent } from './components/backoffice/userManagement/see-details-user/see-details-user.component';
import { ConsulterEmailsComponent } from './components/backoffice/emailManagement/consulter-emails.component';
import { AuthGuard } from './services/AuthGuard/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserListComponent } from './components/backoffice/userManagement/user-list/user-list.component';
import { GetVersionByFrameworkComponent } from './components/backoffice/versionsManagement/get-version-by-framework/get-version-by-framework.component';
import { VersionListComponent } from './components/backoffice/versionsManagement/version-list/version-list.component';
import { ConsulterProjectComponent } from './components/backoffice/projectManagement/consulter-project/consulter-project.component';
import { AddProjectComponent } from './components/backoffice/projectManagement/addProject/add-project/add-project.component';
import { TestHomeComponent } from './components/test-home/test-home.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { ProfilPageComponent } from './components/profil-page/profil-page.component';
import { ConfigureProjectComponent } from './components/configure-project/configure-project.component';
import { ConsulterDeveloperComponent } from './components/backoffice/developerManagement/consulter-developer/consulter-developer.component';
import { AddDeveloperComponent } from './components/backoffice/developerManagement/add-developer/add-developer.component';
import { UpdateDeveloperComponent } from './components/backoffice/developerManagement/update-developer/update-developer.component';
import { SeeDetailDeveloperComponent } from './components/backoffice/developerManagement/see-detail-developer/see-detail-developer.component';
import { ListDeveloperComponent } from './components/backoffice/developerManagement/list-developer/list-developer.component';
import { DashboardComponent } from './components/backoffice/dashboard/dashboard.component';

// import { UpdateProfilComponent } from './components/profil-page/update-profil/update-profil.component';

const routes: Routes = [
  {
    path: 'login' , 
    component: LoginComponent
  },
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'register' , 
    component: RegisterComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/consulter-users', 
    component: ConsulterUsersComponent,
    canActivate: [AuthGuard]
  },
  {path:'admin/dashboard',
  component:DashboardComponent,
  canActivate: [AuthGuard]
  },
  
  {
    path: 'admin/add-user' , 
    component: AddUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/update-user/:username/:id/:name/:email/:role' , 
    component:UpdateUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/see-details-user/:username/:id/:name/:email/:role', 
    component: SeeDetailsUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/add-project/:iduser',
    component: AddProjectComponent
  },
  {
    path: 'admin/consulter-framework' , 
    component: ConsulterFrameworkComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/consulter-developer',
    component: ConsulterDeveloperComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/add-developer',
    component: AddDeveloperComponent,
    canActivate: [AuthGuard]
  },
  {
  path: 'admin/update-developer/:id/:name/:username/:email' , 
    component:UpdateDeveloperComponent,
    canActivate: [AuthGuard]
  },
  {path: 'admin/see-details-developer/:id/:name/:username/:email',component: SeeDetailDeveloperComponent,
    canActivate: [AuthGuard]
  },
  {path: 'develperlist',component: ListDeveloperComponent},
  
  // {
  //   path: 'admin/consulter-emails', 
  //   component: ConsulterEmailsComponent,
  //   canActivate: [AuthGuard]
  // },
  {path: 'userlist',component: UserListComponent},
  {path: 'admin/versionByFramework',component: GetVersionByFrameworkComponent},
  {path: 'admin/version-list',component: VersionListComponent},
  {path: 'testHome',component: TestHomeComponent},
  {path: 'profil',component: ProfilPageComponent},
  {path: 'user/project',component: ProjectPageComponent},
  {path: 'admin/consulter-projects',component: ConsulterProjectComponent},
  {path: 'configure_project/:id_project/:_statut/:_description',component: ConfigureProjectComponent ,},
  {path: '**',component: NotFoundComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
