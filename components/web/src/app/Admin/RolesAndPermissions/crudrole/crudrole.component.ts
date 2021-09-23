import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RolesService } from 'src/app/Services/roles.service';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-crudrole',
  templateUrl: './crudrole.component.html',
  styleUrls: ['./crudrole.component.scss'],
})
export class CrudroleComponent implements OnInit {
  Subject$ = new Subject();
  roles = [];
  submitted;
  displayModal;
  productDialog;
  form;
  currentRole;
  update;
  save;
  SelectedPermissions = [];
  currentPermissions = [];
  permissions=[];
  Allpermissions=[];

  constructor(
    public RolesService: RolesService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.Subject$.pipe(
      exhaustMap(() =>
        this.RolesService.Addrole(this.form.value).pipe(
          tap((res: any) => console.log(res.message))
        )
      )
    ).subscribe(
      (result) => {
        console.log('roles', this.roles);
        if (!result) {
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
          detail: 'Role added',
        });
        // window.location.reload();
        this.form.value.id=result.role.id
        this.roles.push(this.form.value);

        this.roles = [...this.roles];

        // this.roles = [...this.roles, this.form.value];
        this.cdr.detectChanges();

        this.displayModal = false;
        this.submitted = false;
      },
      (err) => {
        console.log(err);
      }
    );

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      permission: new FormControl('', [Validators.required]),
    });

    this.RolesService.GetRoles().subscribe((result) => {
      this.roles = result.role;
      this.Allpermissions=result.permissionNames.map(e=>e.name);

      console.log(result.role);
    });

    this.RolesService.GetPermissions().subscribe((result) => {
      this.permissions = result.permission;
      console.log(result.permission);
    });
  }


  HandleForm() {
    this.Subject$.next();
  }

  openNew() {
    // this.product = {};
    this.save = true;
    this.displayModal = true;
    this.SelectedPermissions = [];
    this.form.patchValue({
      name: '',
      permission: this.SelectedPermissions,
    });
  }
  hideDialog() {
    this.displayModal = false;
    this.update = false;
    this.save = false;
  }
  saveProduct() {}

  editRole(role) {
    this.update = true;
    this.RolesService.GetRole_Permissions(role.id).subscribe((result: any) => {
      this.displayModal = true;
      this.SelectedPermissions=[]
      result.permissions.forEach((element) => {
        this.SelectedPermissions = [...this.SelectedPermissions, element.id];
        // this.SelectedPermissions.push(element.id)
      });
      this.form.addControl('id', new FormControl(role.id, Validators.required));
      this.form.patchValue({
        id:role.id,
        name: role.name,
        permission: this.SelectedPermissions,
      });

    });


    // this.RolesService.changeMessage(role);

    // this.form.patchValue({
    //   name: role.name,
    //   permissions:this.currentRole.permissions,
    //   id : this.currentRole.id
    //   });
  }
  updateRole() {
    this.RolesService.UpdateRole(this.form.value).subscribe((result) => {
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
        detail: 'Role updated',
      });

      this.roles.filter((element) => element.id == this.form.get("id").value);
      this.roles = this.roles.map(obj=>{
        if(obj.id ==  this.form.get("id").value){
          obj.name = this.form.get("name").value;
          obj.permission = this.SelectedPermissions
          console.log(obj,"b")
          return obj
        }
        return obj
      })
      this.displayModal = false ;
    });


  }

  DeleteRole(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this role?',
      accept: () => {
        this.RolesService.DeleteRole(id).subscribe((result) => {
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
            detail: 'Role Deleted',
          });
          this.roles = this.roles.filter((element) => element.id != id);
        });
      },
    });
  }

  ChangePermissions(event, dd) {
    console.log(this.SelectedPermissions);
    console.log('val', event.itemValue);
  }
}
