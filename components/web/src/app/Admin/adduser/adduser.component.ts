import { RolesService } from './../../Services/roles.service';
import { AuthService } from 'src/app/Services/AuthService';
import { UtilsService } from './../../Services/utils.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { EtablissementService } from './../../Services/etablissement.service';
import { NgForm, FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
form : FormGroup;
Etablissements;
Roles;
selectedEtab;
selectedrole;
Selectedfile;
uploadedFiles: any[] = [];

  constructor(private router : Router,public EtablissementService:EtablissementService,private _route: ActivatedRoute,private UtilsService : UtilsService
    ,private messageService: MessageService,private AuthService : AuthService,private RolesService : RolesService, private fb: FormBuilder,public _location: Location) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      address: [''],
      password: [''],
      etablissement_id: [''],
      role: [''],
      photo : [''],
    })

    this.EtablissementService.Get_Etablissement().subscribe((result)=>{
      console.log("All etab",result.etablissements);
     this.Etablissements=result.etablissements;
  });

  this.RolesService.User_GetRoles().subscribe((result)=>{
    console.log("All roles",result.role);
   this.Roles=result.role;
});

  }

  Handleform(){
    let formData :FormData = new FormData();
    formData.append('photo', this.Selectedfile,this.Selectedfile.name);
    formData.append('name', this.form.get('name').value);
    formData.append('email', this.form.get('email').value);
    formData.append('address', this.form.get('address').value);
    formData.append('password', this.form.get('password').value);
    formData.append('etablissement_id', this.form.get('etablissement_id').value);
    formData.append('role', this.form.get('role').value);
    formData.append('_method', 'POST');

    this.AuthService.SignUp(formData).subscribe((result)=>{
      if (result.success){
        this.AuthService.changeMessage({severity:'success',summary:'success',detail:'User added'});

        this.router.navigate(['../../admin/users']);

      }
      if (!result.success) {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: result.message,
        });
        return;
      }

    });

  }
  handleCancel(){
    this._location.back();
  }

  onSelect(event) {
        this.uploadedFiles.push(event.currentFiles[0]);
        this.Selectedfile =event.currentFiles[0];
}
}
















 // onFileSelect(event) {

  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log("fef",event.target.files[0]);

  //      this.Selectedfile =file;
  //   }
  // }
