import { ViewpostComponent } from './Admin/Posts/viewpost/viewpost.component';

import { httpInterceptor } from './Interceptors/http-interceptor';
import { HomeComponent } from './User/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './User/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './User/forgot-password/forgot-password.component';
import { AdminMainComponent } from './Admin/admin-main/admin-main.component';
import { MainComponent } from './Admin/main/main.component';
import { CrudtableComponent } from './Admin/crudtable/crudtable.component';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
import { FrontComponent } from './Front/front/front.component';
import { Front2Component } from './Front/front2/front2.component';
import { Test1Component } from './Front/test1/test1.component';
import { Test1BackComponent } from './Front/test1-back/test1-back.component';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { HeaderComponent } from './Admin/header/header.component';
import { EtablissementsComponent } from './Admin/etablissements/etablissements.component';
import { SidebarComponent } from './Admin/sidebar/sidebar.component';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { EditEtablissementComponent } from './Admin/edit-etablissement/edit-etablissement.component';
import { CrudRowComponent } from './Admin/crud-row/crud-row.component';
import { AdduserComponent } from './Admin/adduser/adduser.component';
import { AddEtablissementComponent } from './Admin/add-etablissement/add-etablissement.component';
import { UsersComponent } from './Admin/users/users.component';
import { CrudUsersTableComponent } from './Admin/crud-users-table/crud-users-table.component';
import { UserprofileComponent } from './Admin/userprofile/userprofile.component';
import { MyprofileComponent } from './Admin/myprofile/myprofile.component';

import { HeaderUserComponent } from './User/header-user/header-user.component';
import { FooterUserComponent } from './User/footer-user/footer-user.component';
import {FileUploadModule} from 'primeng/fileupload';
import { SpinnerComponent } from './Admin/spinner/spinner.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {OrderListModule} from 'primeng/orderlist';
import { RolesAndPermissionsComponent } from './Admin/RolesAndPermissions/roles-and-permissions/roles-and-permissions.component';
import { CrudroleComponent } from './Admin/RolesAndPermissions/crudrole/crudrole.component';
import { DocumentsComponent } from './Admin/Documents/documents/documents.component';
import { CrudDocumentsComponent } from './Admin/Documents/crud-documents/crud-documents.component';
import { EvenementsComponent } from './Admin/Events/evenements/evenements.component';
import { CrudEventsComponent } from './Admin/Events/crud-events/crud-events.component';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {CalendarModule} from 'primeng/calendar';
import {EditorModule} from 'primeng/editor';
import { PostsComponent } from './Admin/Posts/posts/posts.component';
import { CrudpostsComponent } from './Admin/Posts/crudposts/crudposts.component';
import { AddpostComponent } from './Admin/Posts/addpost/addpost.component';
import { EditpostComponent } from './Admin/Posts/editpost/editpost.component';
import { ChatComponent } from './Admin/Chat/chat/chat.component';
import {SidebarModule} from 'primeng/sidebar';
import { PrivateChatComponent } from './Admin/private-chat/private-chat.component';
import { MatBadgeModule } from '@angular/material/badge';
import {InputSwitchModule} from 'primeng/inputswitch';
import { GalleryComponent } from './Admin/Gallerys/gallery/gallery.component';
import { MainGalleryComponent } from './Admin/Gallerys/main-gallery/main-gallery.component';
import {GalleriaModule} from 'primeng/galleria';
import { EditGalleryComponent } from './Admin/Gallerys/edit-gallery/edit-gallery.component';
import { DynamicFormComponent } from './Admin/Forms/dynamic-form/dynamic-form.component';
import { FormsComponent } from './Admin/Forms/forms/forms.component';
import { QuestionComponentComponent } from './Admin/question-component/question-component.component';
import { ShowformComponent } from './Admin/Forms/showform/showform.component';
import {CheckboxModule} from 'primeng/checkbox';
import { CrudInputsComponent } from './Admin/Formulaire/crud-inputs/crud-inputs.component';
import { InputsComponent } from './Admin/Formulaire/inputs/inputs.component';
import { EventComponent } from './User/Events/event/event.component';
import { EventDetailComponent } from './User/Events/event-detail/event-detail.component';
import { GalleryItemComponent } from './User/Gallerys/gallery-item/gallery-item.component';
import { UserGalleryComponent } from './User/Gallerys/user-gallery/user-gallery.component';
import { UserDocumentComponent } from './User/Documents/user-document/user-document.component';
import { DocumentItemComponent } from './User/Documents/document-item/document-item.component';
import { AboutUsComponent } from './User/about-us/about-us.component';
import { MakeDynamicFormComponent } from './Admin/Formulaire/makeform/make-dynamic-form/make-dynamic-form.component';
import { MakeQuestionComponent } from './Admin/Formulaire/makeform/make-question/make-question.component';
import { MakeformComponent } from './Admin/Formulaire/makeform/makeform/makeform.component';
import { ShowFormulaireComponent } from './Admin/Formulaire/show-formulaire/show-formulaire.component';
import { ListFomulaireComponent } from './Admin/Formulaire/list-fomulaire/list-fomulaire.component';
import { FormulaireDetailsComponent } from './Admin/Formulaire/formulaire-details/formulaire-details.component';
import { TentativeDetailsComponent } from './Admin/Formulaire/tentative-details/tentative-details.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { UserFormulaireComponent } from './User/Formulaires/user-formulaire/user-formulaire.component';
import {ListboxModule} from 'primeng/listbox';
import { ShowUserFormulaireComponent } from './User/Formulaires/show-user-formulaire/show-user-formulaire.component';
import {ColorPickerModule} from 'primeng/colorpicker';
import { CheckboxComponent } from './Admin/Formulaire/checkbox/checkbox.component';
import { CheckBoxComponentComponent } from './Components/check-box-component/check-box-component.component';
import { NotFoundComponent } from './User/not-found/not-found.component';
import { UserUnderHeaderComponent } from './User/Components/user-under-header/user-under-header.component';
import { UserTitleDescriptionComponent } from './User/Components/user-title-description/user-title-description.component';
import { UserTopHeaderComponent } from './User/Components/user-top-header/user-top-header.component';
import { UserEventsCalendarComponent } from './User/Components/user-events-calendar/user-events-calendar.component';
import { UserSidebarComponent } from './User/Components/user-sidebar/user-sidebar.component';
import { UserpostComponent } from './User/Posts/userpost/userpost.component';
import { PostDetailsComponent } from './User/Posts/post-details/post-details.component';
import { CommentComponent } from './User/Components/comment/comment.component';
import { ProfileComponent } from './User/UserProfile/profile/profile.component';
import { SignupComponent } from './User/signup/signup.component';
import { SmallLoginComponent } from './User/Components/small-login/small-login.component';
import { AdminprofileComponent } from './Admin/adminprofile/adminprofile.component';
import { ForbiddenComponent } from './User/forbidden/forbidden.component';
import { HomeHeaderComponent } from './User/Components/home-header/home-header.component';
import { ContactComponent } from './User/contact/contact.component';
import { EditFormulaireComponent } from './Admin/Formulaire/edit-formulaire/edit-formulaire.component';
import { EditComponent } from './Admin/Formulaire/edit/edit.component';
import { EvenementslistTemplateComponent } from './Admin/EvenementList/evenementslist-template/evenementslist-template.component';
import { ChartModule } from 'primeng/chart';
// import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { ChartsModule } from 'ng2-charts';
import { DocumentsSubjectComponent } from './Admin/Documents/documents-subject/documents-subject.component';
import { EventTypeComponent } from './Admin/Events/event-type/event-type.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    AdminMainComponent,
    MainComponent,
    CrudtableComponent,
    FrontComponent,
    Front2Component,
    Test1Component,
    Test1BackComponent,
    HeaderComponent,
    EtablissementsComponent,
    SidebarComponent,
    EditEtablissementComponent,
    CrudRowComponent,
    AdduserComponent,
    AddEtablissementComponent,
    UsersComponent,
    CrudUsersTableComponent,
    UserprofileComponent,
    MyprofileComponent,
    HeaderUserComponent,
    FooterUserComponent,
    SpinnerComponent,
    CrudroleComponent,
    RolesAndPermissionsComponent,
    DocumentsComponent,
    CrudDocumentsComponent,
    EvenementsComponent,
    CrudEventsComponent,
    PostsComponent,
    CrudpostsComponent,
    AddpostComponent,
    ViewpostComponent,
    EditpostComponent,
    ChatComponent,
    PrivateChatComponent,
    GalleryComponent,
    MainGalleryComponent,
    EditGalleryComponent,
    DynamicFormComponent,
    FormsComponent,
    QuestionComponentComponent,
    ShowformComponent,
    CrudInputsComponent,
    InputsComponent,
    EventComponent,
    EventDetailComponent,
    GalleryItemComponent,
    UserGalleryComponent,
    UserDocumentComponent,
    DocumentItemComponent,
    AboutUsComponent,
    MakeDynamicFormComponent,
    MakeQuestionComponent,
    MakeformComponent,
    ShowFormulaireComponent,
    ListFomulaireComponent,
    FormulaireDetailsComponent,
    TentativeDetailsComponent,
    UserFormulaireComponent,
    ShowUserFormulaireComponent,
    CheckboxComponent,
    CheckBoxComponentComponent,
    NotFoundComponent,
    UserUnderHeaderComponent,
    UserTitleDescriptionComponent,
    UserTopHeaderComponent,
    UserEventsCalendarComponent,
    UserSidebarComponent,
    UserpostComponent,
    PostDetailsComponent,
    CommentComponent,
    ProfileComponent,
    SignupComponent,
    SmallLoginComponent,
    AdminprofileComponent,
    ForbiddenComponent,
    HomeHeaderComponent,
    ContactComponent,
    EditFormulaireComponent,
    EditComponent,
    EvenementslistTemplateComponent,
    DocumentsSubjectComponent,
    EventTypeComponent


    // EdituserComponent,


  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AccordionModule,
    ToastModule,
    ConfirmDialogModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatSnackBarModule ,
    OrderListModule,
    ReactiveFormsModule,
    FullCalendarModule,
    CalendarModule,
    EditorModule,
    SidebarModule,
    MatBadgeModule,
    InputSwitchModule,
    GalleriaModule,
    CheckboxModule,
    RadioButtonModule,
    ListboxModule,
    ColorPickerModule,
    ChartModule,
    ChartsModule

  ],
  providers: [
    MessageService,ConfirmationService,CrudtableComponent, { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
