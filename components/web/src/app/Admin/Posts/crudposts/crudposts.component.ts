import { PostService } from './../../../Services/post.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EtablissementService } from './../../../Services/etablissement.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map, mergeAll, exhaustMap, mergeMap, tap } from 'rxjs/operators';
import { DocumentService } from './../../../Services/document.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin, Subject, of, Observable, from } from 'rxjs';
import { Document } from 'src/app/Utils/Document';

@Component({
  selector: 'app-crudposts',
  templateUrl: './crudposts.component.html',
  styleUrls: ['./crudposts.component.scss']
})
export class CrudpostsComponent implements OnInit {

  Subject$ = new Subject();
  permissions = [];
  submitted;
  displayModal;
  productDialog;
  form;
  currentRole;
  update;
  save;
  SelectedPermissions = [];
  currentPermissions = [];
  posts = [] as any;
  uploadedFiles: any[] = [];
  Selectedfile;
  FetchDocs
  FetchSujets
  SelectedSujet;
  SelectedEtablissement;
  SelectedSearchEtab:any=null;
  formData :FormData
  SelectedETab: Number;
  etablissements: Array<any> = []
  OriginalPosts;
  id
  Localrole_id= +localStorage.getItem('role_id') ;
  Localetablissement_id= +localStorage.getItem('etablissement_id')
  Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));
  sub$ = new Subject<Array<any>>();
  constructor(private confirmationService: ConfirmationService,private PostService : PostService,private fb: FormBuilder,private EtablissementService:EtablissementService,private messageService : MessageService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.Localrole ? 0 :  this.Localetablissement_id;
    forkJoin([this.EtablissementService.Get_Etablissement(), this.PostService.GetAllPosts(this.id)]).subscribe(data=>{
      this.etablissements = data[0].etablissements;
      this.posts=data[1].posts;
      this.permissions=data[1].permissionNames.map(e=>e.name);

  // if(this.posts.length==0) alert("No posts yet")
  //       console.log(this.posts);

      this.OriginalPosts = data[1].posts;


    })

  }
  hideDialog(){}
HandleForm(){}
updateDocument(){}
// DeletePost(id){}

openNew() {
  console.log(this.SelectedSearchEtab);

//   if(this.SelectedSearchEtab==null && this.Localrole_id == 6){
//     alert("Select an etablissement")
//     return ;
// }
this.SelectedSearchEtab= +this.Localetablissement_id;
this.save = true;

  this.displayModal = true;
  this.form.patchValue({
    name: '',
    description: '',
    sujet: '',
    piece: '',
    etablissement_id: '',
  });

  // let formData :FormData = new FormData();
  // formData.append('contenu', this.Selectedfile,this.Selectedfile.name);
  // formData.append('nom', this.form.get('nom').value);
  // formData.append('description', this.form.get('description').value);
  // formData.append('etablissement_id', this.form.get('etablissement_id').value);
  // formData.append('sujet_document_id', this.form.get('sujet_document_id').value);
  // formData.append('_method', 'POST');

  // console.log("val form",formData);
  // this.form.patchValue({
  //   name: '',
  //   permission: this.SelectedPermissions,
  // });
}






  OnChangeEtab(event){
    this.SelectedSearchEtab = event.value
  this.posts=  this.OriginalPosts;
  if(event.value!=null)
    this.posts = this.posts.filter((element=> element.etablissement_id == event.value))

    console.log("d+",this.posts);


  }
  onSelect(event){}

  DeletePost(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Document?',
      accept: () => {
        this.PostService.DeletePost(id).subscribe((result) => {
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
            detail: 'Post Deleted',
          });
          this.posts = this.posts.filter((element) => element.id != id);
          // this.OriginalDocs = this.OriginalDocs.filter((element) => element.id != id);
        });
      },
    });
  }

}
