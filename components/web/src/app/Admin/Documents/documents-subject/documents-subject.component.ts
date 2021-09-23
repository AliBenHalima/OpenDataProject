import { MessageService, ConfirmationService } from 'primeng/api';
import { EtablissementService } from './../../../Services/etablissement.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map, mergeAll, exhaustMap, mergeMap, tap } from 'rxjs/operators';
import { DocumentService } from './../../../Services/document.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin, Subject, of, Observable, from } from 'rxjs';

@Component({
  selector: 'app-documents-subject',
  templateUrl: './documents-subject.component.html',
  styleUrls: ['./documents-subject.component.scss']
})
export class DocumentsSubjectComponent implements OnInit {

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

    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      id: new FormControl(null),
    });

    forkJoin([this.DocumentService.GetSujetDoc(), this.DocumentService.GetAllDocuments(this.id)]).subscribe(data=>{
      this.FetchSujets = data[0].sujets;
      this.documents=data[1].documents;
      this.permissions=data[1].permissionNames.map(e=>e.name);

      this.OriginalDocs = data[1].documents;

    })

    this.Subject$.pipe(
      exhaustMap((formdata) =>
        this.DocumentService.AddDocumentSubject(formdata).pipe(
          tap((res: any) => console.log(res.message))
        )
      )
    ).subscribe(
      (result) => {
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
          detail: 'Subject added',
        });

       this.GetSujetDoc();
          this.cdr.detectChanges();
        this.displayModal = false;

      },
      (err) => {
        console.log(err);
      }
    );


  }

  GetSujetDoc(){
    this.DocumentService.GetSujetDoc().subscribe(result=>{
      this.FetchSujets = result.sujets;
    })


  }

  openNew() {

  this.SelectedSearchEtab= +this.Localetablissement_id;
  this.save = true;
    this.displayModal = true;
    this.form.patchValue({
      nom: ''
    });

  }

  hideDialog() {
    this.displayModal = false;
    this.update = false;
    this.save = false;
    this.form.controls['id'].setValue(null);
  }


  HandleForm(){
    this.Subject$.next(this.form.value);
  }

  deleteSubject(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this subject?',
      accept: () => {
        this.DocumentService.DeleteSubject(id).subscribe((result) => {
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
            detail: 'Subject Deleted',
          });
          this.GetSujetDoc();
        });
      },
    });
  }

editSubject(subject) {
  this.update = true;
  let CurrentDoc=  this.FetchSujets.filter(element=> element.id ==subject.id)
    this.displayModal = true;
    console.log(CurrentDoc);

    this.SelectedSujet= CurrentDoc[0].sujet_document_id ;
    this.SelectedEtablissement= CurrentDoc[0].etablissement_id ;

    this.form.patchValue({
      nom: subject.nom
    });
    this.form.controls['id'].setValue(subject.id);
}

updateSubject() {
  this.DocumentService.UpdateSubject(this.form.get('id').value,this.form.value).subscribe((result) => {
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
      detail: 'Subject updated',
    });
    this.displayModal=false;
    this.GetSujetDoc();
  });
}




}

