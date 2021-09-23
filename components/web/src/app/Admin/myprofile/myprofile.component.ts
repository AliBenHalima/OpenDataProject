import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EtablissementService } from './../../Services/etablissement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  user_id: Number;
  CurrentUser : any;
  form : FormGroup;
  constructor(private router : Router,public EtablissementService:EtablissementService,private _route: ActivatedRoute,
  private messageService: MessageService) { }

  ngOnInit(): void {
    this.user_id = this._route.snapshot.params['id'] ;

    this.form = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      etablissement_id: new FormControl('',[Validators.required]),
    })

  this.EtablissementService.Get_User_withEtabData(this.user_id).subscribe(result=>{
    this.CurrentUser = result.message;
    console.log(this.CurrentUser,'faz');
    this.form.patchValue({
      name: this.CurrentUser.name,
      email:this.CurrentUser.email,
      address:this.CurrentUser.email,
      etablissement_id:this.CurrentUser.nom, })



  })
  }
  EditForm(){

  }
  handleCancel(){
    this.router.navigate(['/etab']);
  }

}
