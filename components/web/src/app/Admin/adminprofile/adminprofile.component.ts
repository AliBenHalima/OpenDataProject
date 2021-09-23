import { RolesService } from 'src/app/Services/roles.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Services/AuthService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EtablissementService } from 'src/app/Services/etablissement.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminprofileComponent implements OnInit {
 environment=environment.APP_URL;
  id:Number;
  CurrentUser;
  form : FormGroup;
  uploadedFiles=[]
Selectedfile=null;
selectedEtab
Etablissements
Roles
selectedrole
Localrole_id= +localStorage.getItem('role_id');
Local_Id= +localStorage.getItem('id') ;
permissions=[]
Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));

  constructor(private RolesService : RolesService,private router : Router, private EtablissementService : EtablissementService,private _route: ActivatedRoute,private AuthService : AuthService,private messageService : MessageService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      Bio: new FormControl(''),
      etablissement_id: new FormControl(''),
      role: new FormControl(''),
      CurrentPassword: new FormControl(''),
      NewPassword: new FormControl(''),
      ConfirmPassword: new FormControl(''),
    });
    if(this.Localrole){
      this.GetEtablissements();
    }
    this.GetRoles();

    this.id = 0;
    this.EtablissementService.Get_Self_ProfileInfo().subscribe(result=>{
      this.CurrentUser = result.message;
      this.permissions=result.permissionNames.map(e=>e.name);
      this.selectedrole = this.CurrentUser.role_id;
      this.selectedEtab = this.CurrentUser.Etab_id;

      this.form.patchValue({
        name: this.CurrentUser.name,
        email:this.CurrentUser.email,
        address:this.CurrentUser.address,
        Bio:this.CurrentUser.Bio ,
        etablissement_id:this.selectedEtab,
        role:this.selectedrole
        });
    })

  }

  HandleForm(){
    let formData = new FormData();
    formData.append('id', this.CurrentUser.id);
    formData.append('name', this.form.get('name').value);
    formData.append('email', this.form.get('email').value);
    formData.append('address', this.form.get('address').value || " ");
    formData.append('Bio', this.form.get('Bio').value);
    if (this.Selectedfile)
    formData.append('photo', this.Selectedfile,this.Selectedfile.name);

    formData.append('CurrentPassword', this.form.get('CurrentPassword').value);
    formData.append('NewPassword', this.form.get('NewPassword').value);
    formData.append('ConfirmPassword', this.form.get('ConfirmPassword').value);
    formData.append('role', this.selectedrole);
    formData.append('etablissement_id', this.selectedEtab);

    formData.append('_method', 'POST');

    this.AuthService.UpdateOwnProfile(this.CurrentUser.id,formData).subscribe(result=>{
      console.log("upadate",result);
      if (!result.success) {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: result.message,
        });
        return;
      }

      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'User Updated',
      });
      localStorage.setItem('photo',result.user.photo)
      localStorage.setItem('username',result.user.name)
      this.router.navigate(['/admin/users']);
    })
  }
  onUpload(event){
    let formData = new FormData();
  }

  onSelect(event) {
    this.uploadedFiles.push(event.currentFiles[0]);
    this.Selectedfile =event.currentFiles[0];
    console.log(event);

}
GetRoles(){
  this.RolesService.GetRoles().subscribe((result)=>{
    console.log("All roles",result.role);
   this.Roles=result.role;

  });
}

GetEtablissements(){
  this.EtablissementService.Get_Etablissement().subscribe((result)=>{
    console.log("All etab",result.etablissements);
    this.Etablissements=result.etablissements;
    });
}
}
