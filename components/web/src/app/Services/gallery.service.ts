import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpPost, HttpGet, HttpDelete, HttpPut } from './../Utils/HttpCalls';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  token=localStorage.getItem("token");
  constructor(private HttpClient: HttpClient) { }

  AddGallery(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/gallery`,form,this.token);
  }

  FetchGalleryByEtab(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/GetFullGallery/${id}`,this.token);
  }
  GetGalleryByID(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/gallery/${id}`,this.token);
  }

  GetGalleriesByEtab(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/GetGalleriesByEtab/${id}`,this.token);
  }

  DeleteImage(id){
    return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/DeleteImage/${id}`,this.token);
  }

  AddImage(id,form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/AddImage/${id}`,form,this.token);

  }
  EditGallery(id,form){
    return HttpPut(this.HttpClient,`${environment.APP_URL}/api/gallery/${id}`,form,this.token);
  }

  DeleteGallery(id){
    return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/gallery/${id}`,this.token);
  }

  //User /////////////////////////

  User_GetGalleriesByEtab(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/GetGalleriesByEtab/${id}`,this.token);
  }

}
