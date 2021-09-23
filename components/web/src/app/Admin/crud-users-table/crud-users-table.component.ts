import { MessageService, ConfirmationService } from 'primeng/api';
import { EtablissementService } from './../../Services/etablissement.service';
import { AuthService } from '../../Services/AuthService';
import { Component, OnInit } from '@angular/core';
import { map, delay, switchAll, switchMap,mergeMap, exhaustMap } from 'rxjs/operators';
// import { , Event, Subject } from 'rxjs';
import { from, fromEvent,Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-users-table',
  templateUrl: './crud-users-table.component.html',
  styleUrls: ['./crud-users-table.component.scss']
})
export class CrudUsersTableComponent implements OnInit {
Users:any =[];
environment=environment.APP_URL;
Etablissements : any=[];
id ;
idk;
SelectedETab;
Localrole_id= +localStorage.getItem('role_id') ;
OriginalUsers;
id_etab;
permissions=[]
Localetablissement_id= +localStorage.getItem('etablissement_id')
my_id= +localStorage.getItem('id')
Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));

text1: string;
test :Subject<any> = new Subject<any>() ;
  constructor(private AuthService : AuthService, private EtablissementService : EtablissementService,public messageService : MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.id_etab = this.Localrole ? 0 :  this.Localetablissement_id;

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

    this.AuthService.Get_Users(this.id_etab).subscribe(users => {
      users.permissions.forEach(element => {
        this.permissions.push(element.name)
      });

      this.Users =users.users.filter(element=>element.id!=this.my_id && element.is_SuperAdmin ==0)
      this.OriginalUsers = users.users.filter(element=>element.id !=this.my_id && element.is_SuperAdmin ==0 )
            console.log("etablissement users are", users );
           });
             this.EtablissementService.User_Get_Etablissement().subscribe(result =>{
      console.log(result.etablissements);
  this.Etablissements =result.etablissements;
    });

  }

  Get_Etablissement_Name(id){
   return  this.Etablissements.filter(etab => etab.id == id);
  }

  DeleteUser(id){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this user?',
      accept: () => {
      this.AuthService.Delete_User_ById(id).subscribe(result=>{
       console.log("delete data ",result);
       if(!result.success){
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
        detail: 'User deleted',
      });
      this.Users=this.Users.filter(element => element.id != id)

   });
    }
  });
}
goToLink(url: string){
  window.open(url, "_blank");
}

OnChangeEtab(event){

  this.SelectedETab = event.value
  console.log("Nani",this.SelectedETab);

  console.log("user",this.Users);
this.Users=  this.OriginalUsers;

if(event.value!=null)
  this.Users = this.Users.filter((element=> element.etablissement_id == event.value))

}
}
