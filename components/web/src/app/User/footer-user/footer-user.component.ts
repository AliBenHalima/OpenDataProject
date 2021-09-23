import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/Services/AuthService';

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.scss']
})
export class FooterUserComponent implements OnInit {
// Etablissement=JSON.parse(localStorage.getItem("Etablissement"));
Etablissements
Etablissement
  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {
    this.AuthService.watchStorage().subscribe(result=>{
      this.Etablissements=JSON.parse(localStorage.getItem("Etablissements"));
      this.Etablissement=JSON.parse(localStorage.getItem("Etablissement"));
    })
  }

}
