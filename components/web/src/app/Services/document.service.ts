import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpDelete, HttpGet, HttpPost, HttpPut } from './../Utils/HttpCalls';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  token=localStorage.getItem("token");
  constructor(public HttpClient : HttpClient) { }

  GetAllDocuments(id){
    if (id==0){
      return HttpGet(this.HttpClient,`${environment.APP_URL}/api/allDocuments`,this.token);
    }
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/allDocuments/${id}`,this.token);
  }
  get_sujetByID(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/sujetdocuments/${id}`,this.token);
  }
  GetDocuments(){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/documents`,this.token);
  }
  GetSujetDoc(){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/sujetdocuments`,this.token);
  }
  AddDocument(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/documents`,form,this.token);
  }
  DeleteDocument(id){
    return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/documents/${id}`,this.token);
  }

  DeleteSubject(id){
    return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/sujetdocuments/${id}`,this.token);
  }

  UpdateDocument(id,form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/updateDocument/${id}`,form,this.token);
  }
  UpdateSubject(id,form){
    return HttpPut(this.HttpClient,`${environment.APP_URL}/api/sujetdocuments/${id}`,form,this.token);
  }

  GetDocbyEtabID(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/docEtab/${id}`,this.token);
  }

  GetFullDocumentsByEtab(id){
    return id==null ?
       HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/GetFullDocuments`,this.token)
       :
       HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/GetFullDocumentsByETab/${id}`,this.token);
  }

  User_GetFullDocumentsByEtab(id){
    return id==null ?
       HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/GetFullDocuments`,this.token)
       :
       HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/GetFullDocumentsByETab/${id}`,this.token);
  }

  AddDocumentSubject(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/sujetdocuments`,form,this.token);
  }


}
