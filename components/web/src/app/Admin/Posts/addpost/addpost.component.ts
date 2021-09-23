import { PostService } from './../../../Services/post.service';
import { MessageService } from 'primeng/api';
import { EtablissementService } from './../../../Services/etablissement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {
form:FormGroup;
uploadedFiles: any[] = [];
Selectedfile : any = {}
etablissements
Localrole_id= +localStorage.getItem('role_id')
SelectedSearchEtab :any=0;
CurrentEtab :any
text:string
Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));

constructor(private router : Router,public EtablissementService:EtablissementService,private _route: ActivatedRoute,
  private messageService: MessageService, private fb: FormBuilder,private PostService: PostService) { }

  ngOnInit(): void {

    this.CurrentEtab = this.Localrole ? this.SelectedSearchEtab : localStorage.getItem('etablissement_id');
 this.EtablissementService.Get_Etablissement().subscribe(result=>{
      this.etablissements = result.etablissements
    });

    this.form = this.fb.group({
      name: [''],
      sujet: [''],
      description: [''],
      piece: [],
      etablissement_id: ['']
    })









  }

  Handleform(){
if(this.CurrentEtab==0){
  alert("Select an etablissement")
  return ;
}
  console.log("hnh",this.form.get('description').value);


  let formData :FormData = new FormData();
  this.uploadedFiles.forEach(element => {
    formData.append('piece[]',element, element.name);
  });

  formData.append('name', this.form.get('name').value);
  formData.append('sujet', this.form.get('sujet').value);
  formData.append('description', this.form.get('description').value);
  formData.append('etablissement_id', this.CurrentEtab);
  formData.append('_method', 'POST');


  this.PostService.Addpost(formData).subscribe((result)=>{
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
      detail: 'Post added',
    });
    this.router.navigate(['../../admin/posts']);
  });

}

  onSelect(event) {
    event.currentFiles.forEach(element => {
      this.uploadedFiles.push(element)
      // this.Selectedfile.element.name = element
    });
    // this.uploadedFiles.push(event.currentFiles[0]);
    // this.Selectedfile =event.currentFiles[0];
  console.log("uploaded",this.uploadedFiles);

}
handleCancel(){}
onRemoveImage(event){


  console.log(event);
  let index = this.uploadedFiles.indexOf(event.file)
  console.log(index);
   this.uploadedFiles.splice(index,1)
  console.log(this.uploadedFiles,"new");

}
OnChangeEtab(event){
  this.CurrentEtab = event.value

}
}
