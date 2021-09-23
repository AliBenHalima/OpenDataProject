import { environment } from './../../environments/environment.prod';
import { HttpDelete, HttpPost, HttpPut } from './../Utils/HttpCalls';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  token=localStorage.getItem("token");
  constructor(public HttpClient : HttpClient) { }

  SaveComment(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/comments`,form,this.token);
  }
  UpdateComment(form){

    return HttpPut(this.HttpClient,`${environment.APP_URL}/api/comments/${form.comment_id}`,form,this.token);
  }

  DeleteComment(id){
    return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/comments/${id}`,this.token);

  }

  LikeComment(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/likes`,form,this.token);
  }

  SendMail(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/SendMailToUsers`,form,this.token);
  }


}
