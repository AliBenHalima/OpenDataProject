import { FormsService } from 'src/app/Services/forms.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EtablissementService } from './../../../Services/etablissement.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map, mergeAll, exhaustMap, mergeMap, tap } from 'rxjs/operators';
import { DocumentService } from './../../../Services/document.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin, Subject, of, Observable, from } from 'rxjs';
import { Document } from 'src/app/Utils/Document';
import * as data  from  '../../../Utils/jsonfiles/ElementTypes.json';
import * as textBoxtypes  from  '../../../Utils/jsonfiles/Input_Types.json';
import * as CheckboxType  from  '../../../Utils/jsonfiles/CheckboxType.json';
import * as Relationships  from  '../../../Utils/jsonfiles/Relationships.json';

@Component({
  selector: 'app-crud-inputs',
  templateUrl: './crud-inputs.component.html',
  styleUrls: ['./crud-inputs.component.scss'],
})
export class CrudInputsComponent implements OnInit {
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
  FetchDocs;
  FetchSujets;
  SelectedSujet;
  SelectedEtablissement;
  SelectedSearchEtab: any = null;
  formData: FormData;
  SelectedETab: Number;
  etablissements: Array<any> = [];
  OriginalDocs;
  id;
  Localrole_id = +localStorage.getItem('role_id');
  Localetablissement_id = +localStorage.getItem('etablissement_id');
  sub$ = new Subject<Array<any>>();
  options = [];
  InputValue: string = '';
  InputTypes: any = (data as any).default;
  textBoxtypes: any = (textBoxtypes as any).default;
  CheckboxType: any = (CheckboxType as any).default;
  Relationships: any = (Relationships as any).default;
  Allpermissions=[];

  SelectedType = '';
  Selected_textBoxtypes= '';
  Selected_Checkboxtypes="";
  Selected_Relationships="";
  Selected_RelationshipsLabel="";
  inputs: Array<any> = [];
  TableFields: Array<any> = [];

  constructor(
    private confirmationService: ConfirmationService,
    private DocumentService: DocumentService,
    private fb: FormBuilder,
    private EtablissementService: EtablissementService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private FormsService : FormsService,

  ) {}

  // ngAfterViewChecked(){
  //    this.cdr.detectChanges();
  // }
  ngOnInit(): void {
    console.log("uuu",this.Relationships);
   this.GetInputs();
    this.form = new FormGroup({
      label: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      options: new FormControl(''),
      textBoxtypes: new FormControl(''),
      CheckboxType: new FormControl(''),
      relationship_label: new FormControl(''),

    });
  }

  GetInputs(){
  this.FormsService.GetAllInputs_elements().subscribe((result) => {
    console.log('inputs resulys are', result);
    this.inputs=result.inputs;
    this.Allpermissions=result.permissionNames.map(e=>e.name);

    });
  }

  openNew() {
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
    this.SelectedType = '';
    this.options = [];
    this.InputValue = '';
    this.Selected_textBoxtypes=null;
    this.Selected_Checkboxtypes=null;
  }

  HandleForm() {
    this.form.controls.options.setValue(this.options.toString());
    console.log(this.form.value);


    this.FormsService.SaveInput(this.form.value).subscribe((result) => {

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
      this.hideDialog();
      this.GetInputs();
    });

  }

  editDocument() {}
  DeleteDocument() {}
  toggleDisable(event) {
    console.log(event);
    let element = document.getElementById(event.target.id);
    element.removeAttribute('disabled');
  }

  update2(event, index) {
    alert(index);

    if (event.target.value == '') return;
    console.log(event.target.value);

    this.options[index] = event.target.value ;

  }
  DeleteOption(index) {
    this.options.splice(index, 1);
  }

  SaveOption(event) {
    if (event.target.value == '') return;
    console.log('event', event);
    var currentTarget = event.currentTarget;
    this.options.push(event.target.value);
    let inputValue = ((
      document.getElementById(event.target.id) as HTMLInputElement
    ).value = '');
  }
  OnChangeType(event) {
    this.InputValue=""
    this.options=[];
    this.Selected_Checkboxtypes="";


    console.log('test', this.SelectedType);
  }

  change(event){
    console.log(event);
    console.log(this.Selected_Relationships);
    this.TableFields=this.Relationships.find(e=>e.TableName==this.Selected_Relationships).element;
console.log(this.TableFields);

  }
}
