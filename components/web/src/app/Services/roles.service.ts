import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpGet, HttpPost, HttpPut, HttpDelete } from './../Utils/HttpCalls';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  token=localStorage.getItem("token");

  constructor(public HttpClient : HttpClient) { }

  GetRoles(){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/role/roleSpatie`,this.token);
   }

   User_GetRoles(){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/role/user/roleSpatie`,this.token);
   }

   GetPermissions(){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/permissions/perm`,this.token);
   }

   Addrole(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/role/roleSpatie`,form,this.token);
   }

   GetRole_Permissions(id:Number){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/role/RoleAndPermissions`,{'id':id},this.token);
  }

  UpdateRole(form){
    return HttpPut(this.HttpClient,`${environment.APP_URL}/api/role/roleSpatie/${form.id}`,form,this.token);
  }
  DeleteRole(id){
    return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/role/roleSpatie/${id}`,this.token);


  }



  private messageSource = new  BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: any) {
  this.messageSource.next(message)
  }

}

