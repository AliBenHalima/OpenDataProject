import { environment } from 'src/environments/environment';
import { HttpDelete, HttpGet, HttpPost, HttpPut } from './../Utils/HttpCalls';
import { BehaviorSubject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {
  token=localStorage.getItem("token");
  constructor(private HttpClient:HttpClient ,private router:Router) { }

  Get_Etablissement() {
return HttpGet(this.HttpClient,`${environment.APP_URL}/api/etab/etabliss`,this.token);
 }

 User_Get_Etablissement() {
  return HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/AllEtabs`,this.token);
   }

 GetEtablissement(id) {
  return id==null ?
  HttpGet(this.HttpClient,`${environment.APP_URL}/api/etab/etabliss/`,this.token)
  :
  HttpGet(this.HttpClient,`${environment.APP_URL}/api/etab/etabliss/${id}`,this.token)
}

User_GetEtablissement(id) {
  return id==null ?
  HttpGet(this.HttpClient,`${environment.APP_URL}/api/etab/free/etabliss/`,this.token)
  :
  HttpGet(this.HttpClient,`${environment.APP_URL}/api/etab/free/etabliss/${id}`,this.token)
}


 Get_Etablissement_ById(id){
  return HttpGet(this.HttpClient,`${environment.APP_URL}/api/etab/etabliss/${id}`,this.token);
 }

 showEtablissement(id){
  return HttpGet(this.HttpClient,`${environment.APP_URL}/api/etab/showEtablissement/${id}`,this.token);
 }


 Get_Users_ByEtab(id){
  return HttpGet(this.HttpClient,`${environment.APP_URL}/api/users/usersEtab/${id}`,this.token);

 }
 EditEtablissement(id,form){
   return HttpPost(this.HttpClient,`${environment.APP_URL}/api/etab/EditEtab/${id}`,form,this.token);
 }
 DeleteEtablissement(id){
  return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/etab/etabliss/${id}`,this.token);
 }
 AddEtablissement(form){
  return HttpPost(this.HttpClient,`${environment.APP_URL}/api/etab/etabliss`,form,this.token);
 }

 Get_User_withEtabData(id){
  return HttpGet(this.HttpClient,`${environment.APP_URL}/api/users/user_withEtab/${id}`,this.token);
 }

 Get_Self_ProfileInfo(){
  return HttpGet(this.HttpClient,`${environment.APP_URL}/api/users/Get_Self_ProfileInfo`,this.token);
 }




//  public editDataDetails: any = [];
// public subject = new Subject<any>();
private messageSource = new  BehaviorSubject([]);
currentMessage = this.messageSource.asObservable();
changeMessage(message: any) {
this.messageSource.next(message)
}


}
