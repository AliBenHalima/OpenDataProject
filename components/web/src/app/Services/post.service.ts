import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpDelete, HttpGet, HttpPost, HttpPut } from './../Utils/HttpCalls';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  token=localStorage.getItem("token");
  constructor(public HttpClient : HttpClient) { }

  GetAllPosts(id){
    if (id==0){
      return HttpGet(this.HttpClient,`${environment.APP_URL}/api/posts`,this.token);
    }
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/getpostByEtab/${id}`,this.token);
  }

  GetPostwithRole(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/GetPostwithRole/${id}`,this.token);
  }

  Addpost(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/posts`,form,this.token);
  }

  GetPost(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/posts/${id}`,this.token);
  }
  Editpost(id,form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/updatePost/${id}`,form,this.token);
  }

  DeletePost(id){
    return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/posts/${id}`,this.token);
  }

  GetFullPostsID(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/GetFullPosts/${id}`,this.token);
  }

  // USER ////////////////////////////

  User_GetAllPosts(id){
    if (id==0){
      return HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/posts`,this.token);
    }
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/getpostByEtab/${id}`,this.token);
  }

  User_GetPostwithRole(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/GetPostwithRole/${id}`,this.token);
  }

}
