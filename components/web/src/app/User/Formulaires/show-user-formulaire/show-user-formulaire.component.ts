import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/Services/forms.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-show-user-formulaire',
  templateUrl: './show-user-formulaire.component.html',
  styleUrls: ['./show-user-formulaire.component.scss'],
})
export class ShowUserFormulaireComponent implements OnInit {
  constructor(
    public FormsService: FormsService,
    private _route: ActivatedRoute,
    public messageService: MessageService
  ) {}
  questions = [];
  FormData: any;
  form: any;
  formulaire_id: any;
  selectedRadio = '';
  uploadedFiles = [];
  Selectedfile: any;
  public Etablissement: any;
  FormDataSubmit = new FormData();

  ngOnInit(): void {
    this.Etablissement = JSON.parse(localStorage.getItem('Etablissement'));

    this._route.params.subscribe((routeParams) => {
      this.formulaire_id = routeParams.formulaire;
    });

    this.form = new FormGroup({});

    console.log(this.form.value);
    this.FormsService.User_GetFormulaireById(this.formulaire_id).subscribe(
      (result) => {
        console.log('result', result);
        this.FormData = result.formulaire;

        this.FormData.inputs.forEach((e) => {
          e.pivot.required == 1
            ? this.form.addControl(
                e.pivot.id,
                new FormControl('', Validators.required)
              )
            : this.form.addControl(e.pivot.id, new FormControl(''));
        });
      }
    );
  }

  onSubmit() {
    this.FormData.inputs.forEach((e) => {
      this.FormDataSubmit.append(
        e.pivot.id,
        this.form.get(e.pivot.id.toString()).value
      );
    });

    this.FormsService.User_SaveFormRequest(this.FormDataSubmit).subscribe(
      (result) => {
        console.log('Result of saving Form request', result);
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
          detail: 'Form Saved',
        });
      }
    );
  }

  onSelect(event, controlname) {
    this.uploadedFiles.push(event.currentFiles[0]);
    this.Selectedfile = event.currentFiles[0];
    this.form.controls[controlname].setValue(this.Selectedfile);
  }
}
