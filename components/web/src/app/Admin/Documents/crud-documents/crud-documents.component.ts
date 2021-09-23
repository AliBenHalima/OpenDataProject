import { MessageService, ConfirmationService } from 'primeng/api';
import { EtablissementService } from './../../../Services/etablissement.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map, mergeAll, exhaustMap, mergeMap, tap } from 'rxjs/operators';
import { DocumentService } from './../../../Services/document.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin, Subject, of, Observable, from } from 'rxjs';
import { Document } from 'src/app/Utils/Document';

@Component({
  selector: 'app-crud-documents',
  templateUrl: './crud-documents.component.html',
  styleUrls: ['./crud-documents.component.scss']
})
export class CrudDocumentsComponent implements OnInit {
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
  documents = [] as any;
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
  OriginalDocs;
  id
  Localrole_id= +localStorage.getItem('role_id') ;
  Localetablissement_id= +localStorage.getItem('etablissement_id')
  Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));
  sub$ = new Subject<Array<any>>();
  constructor(private confirmationService: ConfirmationService,private DocumentService : DocumentService,private fb: FormBuilder,private EtablissementService:EtablissementService,private messageService : MessageService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.Localrole ? 0 :  this.Localetablissement_id;

  this.form = this.fb.group({
    nom: [''],
    description: [''],
    contenu: [null],
    etablissement_id: [''],
    sujet_document_id: [''],
    id: [null],
  })


    forkJoin([this.EtablissementService.Get_Etablissement(),this.DocumentService.GetSujetDoc(), this.DocumentService.GetAllDocuments(this.id)]).subscribe(data=>{

      this.etablissements = data[0].etablissements;
      this.FetchSujets = data[1].sujets;
      this.documents=data[2].documents;
      this.permissions=data[2].permissionNames.map(e=>e.name);

      this.OriginalDocs = data[2].documents;

      console.log(this.OriginalDocs,"nn");


    })

    this.Subject$.pipe(
      exhaustMap((formdata) =>
        this.DocumentService.AddDocument(formdata).pipe(
          tap((res: any) => console.log(res.message))
        )
      )
    ).subscribe(
      (result) => {
        console.log('documents', this.documents);
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
          detail: 'Document added',
        });

        let etabid=this.etablissements.filter(element=>element.id ==this.SelectedSearchEtab)
       let sujetid= this.FetchSujets.filter(element=>element.id ==this.form.get('sujet_document_id').value)

        this.OriginalDocs = [...this.OriginalDocs, new Document(+result.document.id,this.form.get('nom').value,this.form.get('description').value,this.Selectedfile,this.SelectedSearchEtab,this.form.get('sujet_document_id').value,etabid[0].nom,sujetid[0].nom)]; // fix formdta display



          this.documents = [...this.documents, new Document(+result.document.id,this.form.get('nom').value,this.form.get('description').value,this.Selectedfile,this.SelectedSearchEtab,this.form.get('sujet_document_id').value,etabid[0].nom,sujetid[0].nom)];

          this.cdr.detectChanges();
        this.displayModal = false;

      },
      (err) => {
        console.log(err);
      }
    );


  }

  openNew() {
    console.log(this.SelectedSearchEtab);

    if(this.SelectedSearchEtab==null && this.Localrole){
      alert("Select an etablissement")
      return ;
  }
  this.SelectedSearchEtab= +this.Localetablissement_id;
  this.save = true;
    this.displayModal = true;
    this.form.patchValue({
      name: '',
      nom: '',
      description: '',
      contenu: '',
      etablissement_id: '',
      sujet_document_id: '',

    });

  }

  hideDialog() {
    this.displayModal = false;
    this.update = false;
    this.save = false;
    this.form.controls['id'].setValue(null);
  }


  HandleForm(){

    this.formData = new FormData();
    this.formData.append('contenu', this.Selectedfile,this.Selectedfile.name);
   this.formData.append('nom', this.form.get('nom').value);
   this.formData.append('description', this.form.get('description').value);
   this.formData.append('etablissement_id', this.SelectedSearchEtab);
   this.formData.append('sujet_document_id', this.form.get('sujet_document_id').value);
   this.formData.append('_method', 'POST');

    this.Subject$.next(this.formData);

  }

  DeleteDocument(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Document?',
      accept: () => {
        this.DocumentService.DeleteDocument(id).subscribe((result) => {
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
            detail: 'Document Deleted',
          });
          this.documents = this.documents.filter((element) => element.id != id);
          this.OriginalDocs = this.OriginalDocs.filter((element) => element.id != id);
        });
      },
    });
  }

  onSelect(event) {
    this.uploadedFiles.push(event.currentFiles[0]);
    this.Selectedfile =event.currentFiles[0];
}

editDocument(document) {
  this.update = true;
  let CurrentDoc=  this.documents.filter(element=> element.id ==document.id)
    this.displayModal = true;
    console.log(CurrentDoc);

    this.SelectedSujet= CurrentDoc[0].sujet_document_id ;
    this.SelectedEtablissement= CurrentDoc[0].etablissement_id ;


    this.form.patchValue({
      nom: document.nom,
      description: document.description,
      contenu: '',
      etablissement_id:   this.SelectedEtablissement,
      sujet_document_id:  this.SelectedSujet,
    });

    this.form.controls['id'].setValue(document.id);

}

updateDocument() {

 let formData :FormData= new FormData();
 formData.append('id', this.form.get('id').value);
 if(this.Selectedfile){
  formData.append('contenu', this.Selectedfile,this.Selectedfile.name);
 }

 formData.append('nom', this.form.get('nom').value);
 formData.append('description', this.form.get('description').value);
 formData.append('etablissement_id', this.SelectedEtablissement);
 formData.append('sujet_document_id', this.form.get('sujet_document_id').value);
 formData.append('_method', 'POST');

 console.log("val form",formData);

  this.DocumentService.UpdateDocument(this.form.get('id').value,formData).subscribe((result) => {
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
      detail: 'Document updated',
    });
    this.displayModal=false;

    let etabid=this.etablissements.filter(element=>element.id ==this.SelectedEtablissement)
    let sujetid= this.FetchSujets.filter(element=>element.id ==this.form.get('sujet_document_id').value)

    this.documents = this.documents.map(obj=>{
      if(obj.id ==  this.form.get("id").value){
        return  obj = new Document(this.form.get("id").value,this.form.get('nom').value,this.form.get('description').value,result.filename,this.SelectedEtablissement,this.form.get('sujet_document_id').value,etabid[0].nom,sujetid[0].nom);
      }
      return obj
    })

  });
}

OnChangeEtab(event){
  this.SelectedSearchEtab = event.value
  console.log("Nani",this.SelectedSearchEtab);

  console.log("d",this.documents);
this.documents=  this.OriginalDocs;
if(event.value!=null)
  this.documents = this.documents.filter((element=> element.etablissement_id == event.value))

  console.log("d+",this.documents);

}


}
