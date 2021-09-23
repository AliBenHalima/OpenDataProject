import { AuthService } from 'src/app/Services/AuthService';
import { Router } from '@angular/router';
import { EtablissementService } from './../../Services/etablissement.service';
import { GouverneratService } from './../../Services/gouvernerat.service';
import { Product } from '../../Interfaces/product';
import { ProductService } from 'src/app/product.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { SortEvent } from 'primeng/api';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-crudtable',
  templateUrl: './crudtable.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class CrudtableComponent implements OnInit {
  counter = {};
  public etablissement$: Subject<any>;
  observable: Observable<any>;

  productDialog: boolean;

  AllUsers = [];

  gouvernerates = [];
  selectedCityCodes: string[];
  selectedGov: String[];

  displayModal: boolean;
  selectedProducts: Product[];

  submitted: boolean;
  permissions=[]
  OriginalEtablissements=[]
  statuses: any[];
  res: any;
  id:any;
  Etablissements = [];
  Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));
  Localetablissement_id = +localStorage.getItem('etablissement_id');
  constructor(
    private productService: ProductService,
    public AuthService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private gouverneratService: GouverneratService,
    private etablissementService: EtablissementService,
    private router: Router
  ) {
    this.etablissement$ = new Subject();
  }

  ngOnInit() {
    this.AuthService.currentToast.subscribe((data: any) => {
      if (data.length == 0) return;
      setTimeout(() => {
        this.messageService.add({
          severity: data.severity,
          summary: data.summary,
          detail: data.detail,
        });
      }, 1000);
    });
    let id =0
  this.id= this.Localrole ? null  : this.Localetablissement_id;

    this.etablissementService.GetEtablissement(this.id).subscribe((result) => {
      console.log('All etab', result.etablissements);
      this.Etablissements = result.etablissements;
      this.permissions=result.permissionNames.map(e=>e.name);
    });

    this.res = this.gouverneratService
      .Get_Gouvernerats()
      .subscribe((result) => {
        console.log(result.gouvernerats);
        result.gouvernerats.forEach((element) => {
          this.gouvernerates.push(element);
        });

        console.log('gov', this.gouvernerates);

        console.log();

        return result;
      });
  }

  nextCount(event, etab) {
    this.etablissementService.changeMessage(etab);
  }

  ChangePaxType(event, dd) {
  }

  openNew() {
    this.submitted = false;

    this.displayModal = true;
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    console.log('seletced', this.selectedGov);
  }
  saveProduct() {}

  DeleteEtab(etab) {
    let r = confirm('Do you want to Delete this Etablissement ? ');
    if (r) {
      this.etablissementService
        .DeleteEtablissement(etab.id)
        .subscribe((result) => {
          console.log('res', result);
          if (result.success) {
            this.Etablissements = this.Etablissements.filter(
              (element) => element.id != etab.id
            );
            console.log('this', this.Etablissements);
          }
        });
    }
  }
}
