import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';       
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/auth/Auth.service';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { ConsulterUsersComponent } from './components/backoffice/userManagement/consulter-users/consulter-users.component';
import { UserServiceService } from './services/UserService/user-service.service';
import { HomeComponent } from './components/home/home.component';
import { DeleteConfimationDialogComponent } from './components/backoffice/userManagement/deleteUser/Ask-confirmation-delete/ask-confirmation-delete-dialog.component';
import { DialogService } from './services/dialogService/dialog.service';
import { ConfirmDeleteDialogComponent } from './components/backoffice/userManagement/deleteUser/confirm-delete-dialog/confirm-delete-dialog.component';
import { AddUserComponent } from './components/backoffice/userManagement/add-user/add-user.component';
import { ConsulterFrameworkComponent } from './components/backoffice/frameworkManagement/consulter-framework/consulter-framework.component';
import { AddFrameworkDialogComponent } from './components/backoffice/frameworkManagement/addFramework/add-framework-dialog/add-framework-dialog.component';
import { ConfirmAddFrameworkComponent } from './components/backoffice/frameworkManagement/addFramework/confirm-add-framework/confirm-add-framework.component';
import { UpdateUserComponent } from './components/backoffice/userManagement/update-user/update-user/update-user.component';
import { SeeDetailsUserComponent } from './components/backoffice/userManagement/see-details-user/see-details-user.component';
import { ConsulterEmailsComponent } from './components/backoffice/emailManagement/consulter-emails.component';
import { NgxSpinnerModule } from 'ngx-spinner';
//import { CustomHttpInterceptor } from './services/home/http.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuard } from './services/AuthGuard/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserListComponent } from './components/backoffice/userManagement/user-list/user-list.component';
import { ProjectService } from './services/project/project.service';
import { AskDeleteFrameworkDialogComponent } from './components/backoffice/frameworkManagement/deleteFramework/ask-delete-framework-dialog/ask-delete-framework-dialog.component';
import { ConfirmDeleteFrameworkComponent } from './components/backoffice/frameworkManagement/deleteFramework/confirm-delete-framework/confirm-delete-framework.component';
import { VersionListComponent } from './components/backoffice/versionsManagement/version-list/version-list.component';
import { GetVersionByFrameworkComponent } from './components/backoffice/versionsManagement/get-version-by-framework/get-version-by-framework.component';
import { FooterComponent } from './components/footer/footer.component';

import { DeleteVersionComponent } from './components/backoffice/versionsManagement/deleteVersion/delete-version/delete-version.component';
import { DeleteConfirmedComponent } from './components/backoffice/versionsManagement/deleteVersion/delete-confirmed/delete-confirmed.component';
import { AddVersionComponent } from './components/backoffice/versionsManagement/addVersion/add-version/add-version.component';
import { ConfirmedAddComponent } from './components/backoffice/versionsManagement/addVersion/confirmed-add/confirmed-add.component';
import { ConsulterProjectComponent } from './components/backoffice/projectManagement/consulter-project/consulter-project.component';
import { DeleteProjectComponent } from './components/backoffice/projectManagement/deleteProject/delete-project/delete-project.component';
import { DeleteConfirmedProjectComponent } from './components/backoffice/projectManagement/deleteProject/delete-confirmed-project/delete-confirmed-project.component';
import { AddProjectComponent } from './components/backoffice/projectManagement/addProject/add-project/add-project.component';
import { AddConfirmedProjectComponent } from './components/backoffice/projectManagement/addProject/add-confirmed-project/add-confirmed-project.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { ProfilPageComponent } from './components/profil-page/profil-page.component';
import { MatStepperModule } from '@angular/material/stepper';
import { PopupCreateProjectComponent } from './components/test-home/popup-create-project/popup-create-project.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfigureProjectComponent } from './components/configure-project/configure-project.component';
import { TestHomeComponent } from './components/test-home/test-home.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { GeneratorpdfComponent } from './components/generatorpdf/generatorpdf/generatorpdf.component';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

import { CommonModule, DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddDeveloperComponent } from './components/backoffice/developerManagement/add-developer/add-developer.component';
import { ConsulterDeveloperComponent } from './components/backoffice/developerManagement/consulter-developer/consulter-developer.component';
import { UpdateDeveloperComponent } from './components/backoffice/developerManagement/update-developer/update-developer.component';
import { ListDeveloperComponent } from './components/backoffice/developerManagement/list-developer/list-developer.component';
import { AskDeleteDeveloperComponent } from './components/backoffice/developerManagement/delete-developer/ask-delete-developer/ask-delete-developer.component';
import { SeeDetailDeveloperComponent } from './components/backoffice/developerManagement/see-detail-developer/see-detail-developer.component';
import { ConfirmDeletedDeveloperComponent } from './components/backoffice/developerManagement/delete-developer/confirm-deleted-developer/confirm-deleted-developer.component';
import { ListDataComponent } from './components/configure-project/list_data/list-data/list-data.component';
import { ListDataDeveloperComponent } from './components/configure-project/list_data_developer/list-data-developer/list-data-developer.component';
import { AddConfirmDeveloperComponent } from './components/configure-project/add_developer/add-confirmation/add-confirm-developer/add-confirm-developer.component';
import { AddConfirmDependenceComponent } from './components/configure-project/add-dependency/add-confirmation-dependence/add-confirm-dependence/add-confirm-dependence.component';
import { AddDependenceComponent } from './components/configure-project/add-dependency/add-dependence/add-dependence/add-dependence.component';
import { AddDeveloperToprojectComponent } from './components/configure-project/add_developer/page-add-developer/add-developer-toproject/add-developer-toproject.component';
import { PopupConfirmDeleteDependencyComponent } from './components/configure-project/list_data/list-data/popup_confirm_delete/popup-confirm-delete-dependency/popup-confirm-delete-dependency.component';
import { PopupModifyDependencyComponent } from './components/configure-project/list_data/list-data/popup_modify_dependency/popup-modify-dependency/popup-modify-dependency.component';
import { PopupConfirmModifyComponent } from './components/configure-project/list_data/list-data/popup_confirm_modify/popup-confirm-modify/popup-confirm-modify.component';
import { DashboardComponent } from './components/backoffice/dashboard/dashboard.component';
import { ListDeveloperDashboardComponent } from './components/backoffice/dashboard/list-developer-dashboard/list-developer-dashboard.component';
import { PopupMessageComponent } from './components/test-home/popup-message/popup-message.component';


// import { UpdateProfilComponent } from './components/profil-page/update-profil/update-profil.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ConsulterUsersComponent,
    SideNavbarComponent,
    HomeComponent,
    DeleteConfimationDialogComponent,
    ConfirmDeleteDialogComponent,
    AddUserComponent,
    ConsulterFrameworkComponent,
    ConfirmAddFrameworkComponent,
    AddFrameworkDialogComponent,
    UpdateUserComponent,
    SeeDetailsUserComponent,
    ConsulterEmailsComponent,
    NotFoundComponent,
    UserListComponent,
    AskDeleteFrameworkDialogComponent,
    ConfirmDeleteFrameworkComponent,
    VersionListComponent,
    GetVersionByFrameworkComponent,
    FooterComponent,
    DeleteVersionComponent,
    DeleteConfirmedComponent,
    AddVersionComponent,
    ConfirmedAddComponent,
    ConsulterProjectComponent,
    DeleteProjectComponent,
    DeleteConfirmedProjectComponent,
    AddProjectComponent,
    AddConfirmedProjectComponent,
    TestHomeComponent,
    NavbarUserComponent,
    ProjectPageComponent,
    ProfilPageComponent,
    PopupCreateProjectComponent,
    ConfigureProjectComponent,
    GeneratorpdfComponent,
    AddDeveloperComponent,
    ConsulterDeveloperComponent,
    UpdateDeveloperComponent,
    ListDeveloperComponent,
    AskDeleteDeveloperComponent,
    SeeDetailDeveloperComponent,
    ConfirmDeletedDeveloperComponent,
    ListDataComponent,
    ListDataDeveloperComponent,
    AddConfirmDeveloperComponent,
    AddConfirmDependenceComponent,
    AddDependenceComponent,
    AddDeveloperToprojectComponent,
    PopupConfirmDeleteDependencyComponent,
    PopupModifyDependencyComponent,
    PopupConfirmModifyComponent,
    DashboardComponent,
    ListDeveloperDashboardComponent,
    PopupMessageComponent,
    // UpdateProfilComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    NgbModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxPaginationModule,
    MatSortModule,
    MatTabsModule,
    MatStepperModule,
    MatToolbarModule,
    MatCheckboxModule,
    AngularEditorModule,
    MultiSelectModule,
    DropDownListModule,
    NgSelectModule
  
  ],
 
  providers: [LoginService, UserServiceService, DialogService, AuthGuard, ProjectService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
