import { EvenementsService } from './../../../Services/evenements.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EtablissementService } from './../../../Services/etablissement.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map, mergeAll, exhaustMap, mergeMap, tap } from 'rxjs/operators';
import { DocumentService } from './../../../Services/document.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin, Subject, of, Observable, from } from 'rxjs';
import { Document } from 'src/app/Utils/Document';
@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.scss']
})
export class EventTypeComponent implements OnInit {
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
  id;
  types:any;
  Localrole_id= +localStorage.getItem('role_id') ;
  Localetablissement_id= +localStorage.getItem('etablissement_id')
  Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));
  sub$ = new Subject<Array<any>>();
  constructor(private confirmationService: ConfirmationService,private EvenementsService : EvenementsService,private fb: FormBuilder,private EtablissementService:EtablissementService,private messageService : MessageService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      id: new FormControl(null),
    });

    this.getTypes();

    this.Subject$.pipe(
      exhaustMap((formdata) =>
        this.EvenementsService.AddEventType(formdata).pipe(
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
          detail: 'Type added',
        });

       this.getTypes();
          this.cdr.detectChanges();
        this.displayModal = false;

      },
      (err) => {
        console.log(err);
      }
    );


  }

  getTypes(){
    this.EvenementsService.Get_EventTypes().subscribe(result=>{
      this.types = result.eventTypes;
      this.permissions=result.permissionNames.map(e=>e.name);

    })
  }

  openNew() {

  this.SelectedSearchEtab= +this.Localetablissement_id;
  this.save = true;
    this.displayModal = true;
    this.form.patchValue({
      name: ''
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

  deleteType(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this event type?',
      accept: () => {
        this.EvenementsService.deleteTypes(id).subscribe((result) => {
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
            detail: 'Type Deleted',
          });
          this.getTypes();
        });
      },
    });
  }

editType(type) {
  this.update = true;
  let CurrentDoc=  this.types.filter(element=> element.id ==type.id)
    this.displayModal = true;

    this.form.patchValue({
      name: type.name
    });
    this.form.controls['id'].setValue(type.id);
}

updateType() {
  this.EvenementsService.updateEventType(this.form.get('id').value,this.form.value).subscribe((result) => {
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
      detail: 'Type updated',
    });
    this.displayModal=false;
    this.getTypes();
  });
}

}


