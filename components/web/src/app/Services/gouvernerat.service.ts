import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GouverneratService {
token;
    constructor(private HttpClient:HttpClient ,private router:Router) { }

    Get_Gouvernerats(){
     this.token = localStorage.getItem("token");
    return  this.HttpClient.get<any>(`${environment.APP_URL}/api/gouv/gouvernerat`,{headers:{"Authorization":this.token}});
  }




}
