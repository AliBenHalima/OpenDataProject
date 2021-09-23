import { environment } from 'src/environments/environment';
import { HttpDelete, HttpGet, HttpPost, HttpPut } from './../Utils/HttpCalls';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvenementsService {
  token=localStorage.getItem("token");

  constructor(private HttpClient:HttpClient ,private router:Router) { }

  Get_EventTypes() {
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/eventtype`,this.token);
     }

     AddEvent(form){
      return HttpPost(this.HttpClient,`${environment.APP_URL}/api/event`,form,this.token);
     }

     AddEventType(form){
      return HttpPost(this.HttpClient,`${environment.APP_URL}/api/eventtype`,form,this.token);
     }

     deleteTypes(id){
      return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/eventtype/${id}`,this.token);
     }
     GetEventsByID(id){
       if(id){
        return HttpGet(this.HttpClient,`${environment.APP_URL}/api/eventByEtab/${id}`,this.token);
       }else{
        return HttpGet(this.HttpClient,`${environment.APP_URL}/api/GetFullEvents`,this.token);
       }
     }

      GetEventsID(id){
       if(id){
        return HttpGet(this.HttpClient,`${environment.APP_URL}/api/GetFullEventsID/${id}`,this.token);
       }else{
        return HttpGet(this.HttpClient,`${environment.APP_URL}/api/GetFullEvents`,this.token);
       }
     }

     UpdateEvent(form,id){
      return HttpPost(this.HttpClient,`${environment.APP_URL}/api/UpdateEvent/${id}`,form,this.token);
     }
     updateEventType(id,form){
      return HttpPut(this.HttpClient,`${environment.APP_URL}/api/eventtype/${id}`,form,this.token);
     }

     DeleteEvent(id){
      return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/event/${id}`,this.token);
     }

     GetFullEvents(id) {
       if(id==null){
        return HttpGet(this.HttpClient,`${environment.APP_URL}/api/GetFullEvents`,this.token);
       }
       return HttpGet(this.HttpClient,`${environment.APP_URL}/api/GetFullEvents/${id}`,this.token);
      }

      GetEvent(id){
        return HttpGet(this.HttpClient,`${environment.APP_URL}/api/event/${id}`,this.token);
       }


       //USER/////
       User_GetEvent(id){
        return HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/event/${id}`,this.token);
       }

       User_GetFullEvents(id) {
        if(id==null){
         return HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/GetFullEvents`,this.token);
        }
        return HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/GetFullEvents/${id}`,this.token);
       }

       User_GetEventsByID(id){
        return HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/eventByEtab/${id}`,this.token);
       }



}
