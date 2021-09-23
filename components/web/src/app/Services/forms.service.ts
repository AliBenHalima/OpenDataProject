import { HttpClient } from '@angular/common/http';
import { HttpPost, HttpGet, HttpDelete, HttpPut } from './../Utils/HttpCalls';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FormsService {
  token=localStorage.getItem("token");
  constructor(private HttpClient: HttpClient) { }

  SaveForm(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/forms`,form,this.token);
  }

  GetFormById(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/forms/${id}`,this.token);
  }

  SaveInputs(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/inputs`,form,this.token);
  }

  SaveInput(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/makeinput`,form,this.token);
  }

  GetAllInputs(){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/inputs`,this.token);
  }
  GetAllInputs_elements(){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/inputs/inputs`,this.token);
  }


  SaveFormulaire(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/formulaire`,form,this.token);
  }

  UpdateFormulaire(id,form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/UpdateFormulaire/${id}`,form,this.token);
  }

  GetFormulaireById(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/formulaire/${id}`,this.token);
  }

  SaveFormRequest(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/formrequest`,form,this.token);
  }

  GetAllFormulaires(id){
    if (id==0){
      return HttpGet(this.HttpClient,`${environment.APP_URL}/api/formulaire`,this.token);
    }
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/GetFormulaireByID/${id}`,this.token);
  }

  GetFormulaireFullData(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/GetFormulaireFullData/${id}`,this.token);
  }

  GetTentativeById(id){
  return HttpGet(this.HttpClient,`${environment.APP_URL}/api/formrequest/${id}`,this.token);
  }

  GetTableFieldsValues(data){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/TableFieldsValues`,data,this.token);
  }


  // User ///////////////////////////////

  User_GetFormulaireById(id){
    return HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/formulaire/${id}`,this.token);
  }

  User_SaveFormRequest(form){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/user/formrequest`,form,this.token);
  }

  UserGetAllFormulaires(id){
     return id==0 ?
       HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/formulaire`,this.token)
    :
     HttpGet(this.HttpClient,`${environment.APP_URL}/api/user/GetFormulaireByID/${id}`,this.token);
  }

  User_GetTableFieldsValues(data){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/user/TableFieldsValues`,data,this.token);
  }

  Accepttentative(data){
    return HttpPost(this.HttpClient,`${environment.APP_URL}/api/accepttentative/${data.id}`,data,this.token);
  }

  Deletetentative(id){
    return HttpDelete(this.HttpClient,`${environment.APP_URL}/api/tentative/${id}`,this.token);
  }
}
