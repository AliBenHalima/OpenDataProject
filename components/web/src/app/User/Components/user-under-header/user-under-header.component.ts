import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/Services/AuthService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-under-header',
  templateUrl: './user-under-header.component.html',
  styleUrls: ['./user-under-header.component.scss']
})
export class UserUnderHeaderComponent implements OnInit {
  @Input() Component!:any;
  @Input() ComponentDescription!:any;
  environment=environment.APP_URL;

  // Etablissement=JSON.parse(localStorage.getItem("Etablissement"));
  Etablissements
Etablissement
  constructor(private AuthService : AuthService) { }

  ngOnInit(): void {
    this.AuthService.watchStorage().subscribe(result=>{
      this.Etablissements=JSON.parse(localStorage.getItem("Etablissements"));
      this.Etablissement=JSON.parse(localStorage.getItem("Etablissement"));
      // if (localStorage.getItem("Etablissement")==null){
      //   localStorage.setItem('Etablissement',JSON.stringify(this.MainETablissement));
      //  }
    })

  }

  // checkBackground(){
  //   return this.Etablissement ? 'url(http://127.0.0.1:8000/storage/images/Etablissements/'+this.Etablissement.photo +')'
  //   :
  //   "'assets/FrontTravel/img/ETablissementGeneral.jpg'"
  // }

}
