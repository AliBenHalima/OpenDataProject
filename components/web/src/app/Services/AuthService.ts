import { environment } from 'src/environments/environment';
import { HttpDelete, HttpGet, HttpPost, HttpPut } from '../Utils/HttpCalls';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token=localStorage.getItem("token");
  private authStatusListener = new Subject<boolean>();

  constructor(private HttpClient:HttpClient,private router:Router) { }
  XXX(){
    return this.HttpClient.get<any>("https://jsonplaceholder.typicode.com/todos/1")
  }
  test(){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/test`,this.token);
  }

  public isAuthenticated(): boolean {
    // return this.authStatusListener.asObservable();
    let token = localStorage.getItem('token');
   return token ? true : false ;
  }


  login(form)
  {
    // const user = {email:email,password:password};
   return this.HttpClient.post<any>(`${environment.APP_URL}/api/auth/login`,form);

  }

  SignUp(form)
  {
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/auth/Signup`,form,this.token);
  }

  UserSignUp(form)
  {
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/auth/UserSignUp`,form,this.token);
  }




  Forgot(form:any){
    return  this.HttpClient.post<any>(`${environment.APP_URL}/api/auth/forgot`,form);
  }

  ContactMail(form:any){
    return  this.HttpClient.post<any>(`${environment.APP_URL}/api/auth/ContactMail`,form);
  }

  reset(form){
    return  this.HttpClient.post<any>(`${environment.APP_URL}/api/auth/reset`,form);
  }
  Get_Users(id){
    if (id==0){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/users/user`,this.token);
    }
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/users/freeUsersByETabID/${id}`,this.token);
  }

  Get_User_ById(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/users/user/${id}`,this.token);
  }
  Delete_User_ById(id){
    return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/users/user/${id}`,this.token);
  }
  AddUser(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/users/user`,form,this.token);

  }
  Get_User_Role(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/users/role/${id}`,this.token);
  }
   EditUser(id,form){
    return HttpPut(this.HttpClient,`${environment.APP_URL}/api/users/user/${id}`,form,this.token);
   }

   AddImage(id,form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/users/Addimage/${id}`,form,this.token);
   }

   UpdateUser(id,form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/auth/UpdateUser/${id}`,form,this.token);
   }

   UpdateOwnProfile(id,form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/auth/UpdateOwnProfile/${id}`,form,this.token);
   }



   private messageSource = new  BehaviorSubject([]);
currentToast = this.messageSource.asObservable();
changeMessage(message: any) {
this.messageSource.next(message)
}

private storageSub= new Subject<string>();

watchStorage(): Observable<any> {
  return this.storageSub.asObservable();
}

setItem(key: string, data: any) {
  localStorage.setItem(key, data);
  this.storageSub.next('added');
}



}
