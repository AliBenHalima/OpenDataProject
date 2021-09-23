import { UtilsService } from './../../Services/utils.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { EtablissementService } from './../../Services/etablissement.service';
import { FormControl, FormGroup, NgForm,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-etablissement',
  templateUrl: './add-etablissement.component.html',
  styleUrls: ['./add-etablissement.component.scss']
})
export class AddEtablissementComponent implements OnInit {
  loginform : FormGroup;
  color:string="#ffffff";
  uploadedFiles=[];
  Selectedfile;
  text:string
description:string;
  constructor(private router : Router,public EtablissementService:EtablissementService,private _route: ActivatedRoute,private UtilsService : UtilsService
    ,private messageService: MessageService) { }
  ngOnInit(): void {
    this.loginform = new FormGroup({
      photo: new FormControl('',[Validators.required]),
      nom: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      short_description: new FormControl('',[Validators.required]),
      addresse: new FormControl('',[Validators.required]),
      mapLocation: new FormControl('',[Validators.required]),
      color: new FormControl('',[Validators.required]),
      phone_number: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      video: new FormControl(''),

    })
  }

  HandleForm(){
    console.log("val form",this.loginform.value);
    let formData :FormData = new FormData();
    formData.append('photo', this.Selectedfile,this.Selectedfile.name);
    formData.append('nom', this.loginform.get('nom').value);
    formData.append('email', this.loginform.get('email').value);
    formData.append('description', this.loginform.get('description').value);
    formData.append('short_description', this.loginform.get('short_description').value);
    formData.append('addresse', this.loginform.get('addresse').value);
    formData.append('mapLocation', this.loginform.get('mapLocation').value);
    formData.append('color', this.loginform.get('color').value);
    formData.append('phone_number', this.loginform.get('phone_number').value);
    formData.append('video', this.loginform.get('video').value);

    formData.append('_method', 'POST');

    this.EtablissementService.AddEtablissement(formData).subscribe((result)=>{
      console.log("res",result);
      if (result.success){
        this.router.navigate(['/etab']);
      }
      else{
        console.log('false');
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Welcome Ali'});
      }

    });

  }

  handleCancel(){
    this.router.navigate(['/etab']);
  }

  onSelect(event) {
    this.uploadedFiles.push(event.currentFiles[0]);
    this.Selectedfile =event.currentFiles[0];
    console.log(event);
  }

}
