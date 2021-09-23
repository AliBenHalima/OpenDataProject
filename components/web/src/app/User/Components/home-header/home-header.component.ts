import { MessageService } from 'primeng/api';
import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/Services/AuthService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  environment=environment.APP_URL;
  Etablissements;
  Etablissement;
  constructor(
    private ngZone: NgZone,
    private AuthService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.AuthService.watchStorage().subscribe(result=>{
      this.Etablissements=JSON.parse(localStorage.getItem("Etablissements"));
      this.Etablissement=JSON.parse(localStorage.getItem("Etablissement"));
      // if (localStorage.getItem("Etablissement")==null){
      //   localStorage.setItem('Etablissement',JSON.stringify(this.MainETablissement));
      //  }
    })

}
}
