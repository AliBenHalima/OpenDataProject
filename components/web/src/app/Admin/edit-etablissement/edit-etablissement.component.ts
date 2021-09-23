import { MessageService } from 'primeng/api';
import { UtilsService } from './../../Services/utils.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { EtablissementService } from './../../Services/etablissement.service';
import { AuthService } from 'src/app/Services/AuthService';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CrudtableComponent } from '../crudtable/crudtable.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-etablissement',
  templateUrl: './edit-etablissement.component.html',
  styleUrls: ['./edit-etablissement.component.scss'],
  // providers: [CrudtableComponent]
})

export class EditEtablissementComponent implements OnInit {
  public environment=environment.APP_URL;
 public form : FormGroup;
 public Users : Array<String> ;
 public color:string="#ffffff";
 public SharedEtab: any;
 public selectedMessage:any;
 public CurrentEtab  : any ;
 public etab_id: Number ;
 public uploadedFiles=[];
 public Selectedfile;
 public checked:any;
 public description ;

  constructor(private router : Router,public EtablissementService:EtablissementService,private _route: ActivatedRoute,private UtilsService : UtilsService
    ,private messageService: MessageService) { }


  ngOnInit(): void {

    this.form = new FormGroup({
          nom: new FormControl('',[Validators.required]),
          description: new FormControl('',[Validators.required]),
          addresse: new FormControl('',[Validators.required]),
          short_description: new FormControl('',[Validators.required]),
          mapLocation: new FormControl('',[Validators.required]),
          color: new FormControl('',[Validators.required]),
          phone_number: new FormControl('',[Validators.required]),
          email: new FormControl('',[Validators.required]),
          isMain: new FormControl(false,[Validators.required]),
          video: new FormControl(''),
        });

  this.etab_id = this._route.snapshot.params['etablissement'] ;

  this.EtablissementService.showEtablissement(this.etab_id).subscribe(etablissement => {
    this.CurrentEtab = etablissement.etablissements[0];
    // debugger
    this.description = this.CurrentEtab.description;
    if(!this.CurrentEtab.photo){this.CurrentEtab.photo="Image not.png"}

    this.form.patchValue({
      nom: this.CurrentEtab.nom,
      description:this.CurrentEtab.description,
      short_description:this.CurrentEtab.short_description,
      addresse:this.CurrentEtab.addresse,
      mapLocation:this.CurrentEtab.mapLocation,
      color:this.CurrentEtab.color,
      phone_number:this.CurrentEtab.phone_number,
      email:this.CurrentEtab.email,
      video:this.CurrentEtab.video,
      });

      this.CurrentEtab.isMain==1 ? this.form.patchValue({isMain:true}) : this.form.patchValue({isMain:false});


   });

    this.EtablissementService.currentMessage.subscribe(message => {
      this.CurrentEtab = message;
      console.log("message is", message);
     });
}

EditForm(){
  console.log(this.Selectedfile);

  let formData = new FormData();
  formData.append('id', this.CurrentEtab.id);
  formData.append('nom', this.form.get('nom').value);
  formData.append('description', this.form.get('description').value);
  formData.append('short_description', this.form.get('short_description').value);
  formData.append('addresse', this.form.get('addresse').value);
  formData.append('mapLocation', this.form.get('mapLocation').value);
  formData.append('color', this.form.get('color').value);
  formData.append('phone_number', this.form.get('phone_number').value);
  formData.append('isMain', this.checked);
  formData.append('email', this.form.get('email').value);
  formData.append('video', this.form.get('video').value);

  if (this.Selectedfile!=null)
  formData.append('photo', this.Selectedfile,this.Selectedfile.name);

  formData.append('_method', 'POST');

  console.log("val form",formData);
  this.EtablissementService.EditEtablissement(this.etab_id,formData).subscribe((result)=>{
    console.log("res",result);
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
      detail: 'Etablissement updated',
    });
    window.location.reload();

  });

}
handleCancel(){
  this.router.navigate(['/etab']);
}

onUpload(event){
  let formData = new FormData();
}

onSelect(event) {
  this.uploadedFiles.push(event.currentFiles[0]);
  this.Selectedfile =event.currentFiles[0];
  console.log(event);

}

ToggleOnline(event){
this.checked = event.checked;
  if(event.checked){
  }

}

}
