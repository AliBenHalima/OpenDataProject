import { AuthService } from './../../../Services/AuthService';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-top-header',
  templateUrl: './user-top-header.component.html',
  styleUrls: ['./user-top-header.component.scss']
})

export class UserTopHeaderComponent implements OnInit {
  Etablissement=JSON.parse(localStorage.getItem("Etablissement"));
   Etablissements:any;
  // Etablissement=JSON.parse(localStorage.getItem("Etablissement"));
  // Etablissements=JSON.parse(localStorage.getItem("Etablissements"));
  isAuthenticated

  constructor(public AuthService : AuthService) { }

  ngOnInit(): void {
    // this.AuthService.test().subscribe(res=>{

    // })
    this.isAuthenticated=this.AuthService.isAuthenticated();
    this.AuthService.watchStorage().subscribe(result=>{
      this.Etablissements=JSON.parse(localStorage.getItem("Etablissements"));
      this.Etablissement=JSON.parse(localStorage.getItem("Etablissement"));
    })
  }

  Logout(){
    localStorage.clear();
    localStorage.setItem("Etablissements",JSON.stringify(this.Etablissements))
    this.AuthService.changeMessage({severity:'error',summary:'Message',detail:'Logged out'});
    // this.router.navigate(['/Login']);
  }
  SetEtablissementName(Etablissement){
    localStorage.setItem('Etablissement',JSON.stringify(Etablissement));
    location.reload();
  }
}
