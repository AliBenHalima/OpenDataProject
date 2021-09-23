import { environment } from 'src/environments/environment';
import { HttpPost, HttpGet, HttpDelete } from './../Utils/HttpCalls';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  token=localStorage.getItem("token");
  constructor(private HttpClient : HttpClient) { }

  Send(message){
    // let msg={contenu : message}
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/chat`,message,this.token);
  }

  fetchMessages(){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/chat`,this.token);
  }
  fetchSujet(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/sujets/${id}`,this.token);
  }
  fetchAllSujets(id){
    if(id){
      return HttpGet(this.HttpClient,`${environment.APP_URL}/api/sujets/${id}`,this.token);
    }
    else{
      return HttpGet(this.HttpClient,`${environment.APP_URL}/api/sujets`,this.token);

    }


  }

  AddSujet(form){
      return HttpPost(this.HttpClient,`${environment.APP_URL}/api/sujets`,form,this.token);
  }

  Deletesujet(id){
    return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/sujets/${id}`,this.token);
  }

  FetchFriendmsg(friend_id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/FetchPrivateMsg/${friend_id}`,this.token);
  }

  SendPrivateMessages(message){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/PostPrivateMsg`,message,this.token);
  }

  FetchMyConvUsers(){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/MyConv`,this.token);
  }

  getPrivateConversations(){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/ConvPrivateMsg`,this.token);
  }





}
