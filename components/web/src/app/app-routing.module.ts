import { EvenementslistTemplateComponent } from './Admin/EvenementList/evenementslist-template/evenementslist-template.component';
import { UserDocumentComponent } from './User/Documents/user-document/user-document.component';
import { UserGalleryComponent } from './User/Gallerys/user-gallery/user-gallery.component';
import { EventDetailComponent } from './User/Events/event-detail/event-detail.component';
import { EventComponent } from './User/Events/event/event.component';
import { PrivateChatComponent } from './Admin/private-chat/private-chat.component';
import { EditpostComponent } from './Admin/Posts/editpost/editpost.component';
import { ViewpostComponent } from './Admin/Posts/viewpost/viewpost.component';
import { HomeComponent } from './User/home/home.component';
import { AuthGuardService } from './Services/auth.guard';
import { AdduserComponent } from './Admin/adduser/adduser.component';
import { MyprofileComponent } from './Admin/myprofile/myprofile.component';
import { UserprofileComponent } from './Admin/userprofile/userprofile.component';
// import { EdituserComponent } from './Admin/edituser/edituser.component';
import { AddEtablissementComponent } from './Admin/add-etablissement/add-etablissement.component';
import { EditEtablissementComponent } from './Admin/edit-etablissement/edit-etablissement.component';
import { Front2Component } from './Front/front2/front2.component';
import { ForgotPasswordComponent } from './User/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { AdminMainComponent } from './Admin/admin-main/admin-main.component';
import { FrontComponent } from './Front/front/front.component';
import { Test1Component } from './Front/test1/test1.component';
import { EtablissementsComponent } from './Admin/etablissements/etablissements.component';
import { UsersComponent } from './Admin/users/users.component';
import { LoginGuardService } from './Services/Login.guard';
import { RolesAndPermissionsComponent } from './Admin/RolesAndPermissions/roles-and-permissions/roles-and-permissions.component';
import { DocumentsComponent } from './Admin/Documents/documents/documents.component';
import { EvenementsComponent } from './Admin/Events/evenements/evenements.component';
import { PostsComponent } from './Admin/Posts/posts/posts.component';
import { AddpostComponent } from './Admin/Posts/addpost/addpost.component';
import { ChatComponent } from './Admin/Chat/chat/chat.component';
import { GalleryComponent } from './Admin/Gallerys/gallery/gallery.component';
import { EditGalleryComponent } from './Admin/Gallerys/edit-gallery/edit-gallery.component';
import { FormsComponent } from './Admin/Forms/forms/forms.component';
import { ShowformComponent } from './Admin/Forms/showform/showform.component';
import { AboutUsComponent } from './User/about-us/about-us.component';
import { InputsComponent } from './Admin/Formulaire/inputs/inputs.component';
import { MakeformComponent } from './Admin/Formulaire/makeform/makeform/makeform.component';
import { ShowFormulaireComponent } from './Admin/Formulaire/show-formulaire/show-formulaire.component';
import { ListFomulaireComponent } from './Admin/Formulaire/list-fomulaire/list-fomulaire.component';
import { FormulaireDetailsComponent } from './Admin/Formulaire/formulaire-details/formulaire-details.component';
import { TentativeDetailsComponent } from './Admin/Formulaire/tentative-details/tentative-details.component';
import { UserFormulaireComponent } from './User/Formulaires/user-formulaire/user-formulaire.component';
import { ShowUserFormulaireComponent } from './User/Formulaires/show-user-formulaire/show-user-formulaire.component';
import { NotFoundComponent } from './User/not-found/not-found.component';
import { UserpostComponent } from './User/Posts/userpost/userpost.component';
import { PostDetailsComponent } from './User/Posts/post-details/post-details.component';
import { ProfileComponent } from './User/UserProfile/profile/profile.component';
import { SignupComponent } from './User/signup/signup.component';
import { AdminGuard } from './admin.guard';
import { AdminprofileComponent } from './Admin/adminprofile/adminprofile.component';
import { ForbiddenComponent } from './User/forbidden/forbidden.component';
import { ContactComponent } from './User/contact/contact.component';
import { EditComponent } from './Admin/Formulaire/edit/edit.component';
import { DocumentsSubjectComponent } from './Admin/Documents/documents-subject/documents-subject.component';
import { EventTypeComponent } from './Admin/Events/event-type/event-type.component';

const routes: Routes = [

  { path: 'Login', component: LoginComponent, canActivate: [ LoginGuardService ] },
  {path: 'Signup',component: SignupComponent, canActivate: [ LoginGuardService ] },
  { path: 'reset/:token', component: ResetPasswordComponent,canActivate: [ LoginGuardService ] },
  { path: 'forgot', component: ForgotPasswordComponent,canActivate: [ LoginGuardService ] },

  { path: 'admin' , canActivate: [ AdminGuard ],
  children: [
  { path: 'admin', component: AdminMainComponent , canActivate: [ AuthGuardService ]},
  { path: 'myprofile', component: AdminprofileComponent },
  { path: 'front', component: FrontComponent },
  { path: 'front2', component: Front2Component },
  { path: 'test1', component: Test1Component },
  { path: 'etab', component: EtablissementsComponent },
  { path: 'editetab/:etablissement', component: EditEtablissementComponent },
  { path: 'Addetab', component: AddEtablissementComponent },
  { path: 'users', component: UsersComponent },
  { path: 'userprofile/:user', component: UserprofileComponent },
  { path: 'myprofile/:id', component: MyprofileComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'roles', component: RolesAndPermissionsComponent },
  { path: 'eventsList', component: EvenementslistTemplateComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'documentSubjects', component: DocumentsSubjectComponent },
  { path: 'evenements', component: EvenementsComponent },
  { path: 'eventType', component: EventTypeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'addpost', component: AddpostComponent },
  { path: 'viewpost/:post', component: ViewpostComponent },
  { path: 'editpost/:post', component: EditpostComponent },
  { path: 'chats', component: ChatComponent , canActivate: [ AuthGuardService ]},
  { path: 'PrivateChat', component: PrivateChatComponent, canActivate: [ AuthGuardService ] },
  { path: 'gallery', component: GalleryComponent , canActivate: [ AuthGuardService ]},
  { path: 'EditGallery/:gallery', component: EditGalleryComponent , canActivate: [ AuthGuardService ]},
  { path: 'forms', component: FormsComponent , canActivate: [ AuthGuardService ]},
  { path: 'showform/:form', component: ShowformComponent, canActivate: [ AuthGuardService ] },
  { path: 'inputs', component: InputsComponent , canActivate: [ AuthGuardService ]},
  { path: 'makeform', component: MakeformComponent , canActivate: [ AuthGuardService ]},
  { path: 'edit/:formulaire', component: EditComponent , canActivate: [ AuthGuardService ]},
  {path: 'showformulaire/:formulaire',component: ShowFormulaireComponent},
  { path: 'listformulaire', component: ListFomulaireComponent , canActivate: [ AuthGuardService ]},
  {path: 'formulairedetails/:formulaire',component: FormulaireDetailsComponent},
  {path: 'tentativedetails/:tentative',component: TentativeDetailsComponent},
  {
    path: '**',
    component: NotFoundComponent
  }

]},
{ path: '', component: HomeComponent },

  { path: 'user',
  children: [
    {path: 'events',component: EventComponent},
    {path: 'events/:event',component: EventDetailComponent},
    {path: 'Galleries',component: UserGalleryComponent},
    {path: 'documents',component: UserDocumentComponent},
    {path: 'formulaires',component: UserFormulaireComponent},
    {path: 'formulaire/:formulaire',component: ShowUserFormulaireComponent},
    {path: 'aboutus',component: AboutUsComponent},
    {path: 'posts',component: UserpostComponent},
    {path: 'posts/:post',component: PostDetailsComponent},
    {path: 'myprofile',component: ProfileComponent, canActivate: [ AuthGuardService ] },
    {path: 'contact',component: ContactComponent},
    {path: 'PageNotFound404', component: NotFoundComponent},
    {path: 'AccessDenied', component: ForbiddenComponent},
    {path: '**', redirectTo: '/PageNotFound404'},

    // {path: 'Galleries/:Gallery',component: EventDetailComponent},
    { path: '', component: HomeComponent, pathMatch: 'full'},

  ]},







  // { path: 'edituser/:user', component: EdituserComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuardService,LoginGuardService ]
})
export class AppRoutingModule { }
