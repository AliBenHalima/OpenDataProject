import { EtablissementService } from './../../Services/etablissement.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/Services/AuthService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit {
  @Output() EtablissementObject = new EventEmitter<any>();
  public environment = environment.APP_URL;

  isAuthenticated: boolean;
  // Etablissement : Array<any>=[];
  Etablissements: any;
  user_role: any;
  MainETablissement: any;
  Etablissement: any;
  constructor(
    public AuthService: AuthService,
    private router: Router,
    private EtablissementService: EtablissementService
  ) {}

  ngOnInit(): void {
    this.EtablissementService.User_Get_Etablissement().subscribe((result) => {
      this.MainETablissement = result.etablissements.find((e) => e.isMain == 1);

      this.Etablissement = JSON.parse(localStorage.getItem('Etablissement'));

      this.AuthService.setItem(
        'Etablissements',
        JSON.stringify(result.etablissements)
      );
    });

    this.AuthService.watchStorage().subscribe((result) => {
      this.Etablissements = JSON.parse(localStorage.getItem('Etablissements'));
      this.Etablissement = JSON.parse(localStorage.getItem('Etablissement'));
      this.user_role = JSON.parse(localStorage.getItem('user_role'));
      if (localStorage.getItem('Etablissement') == undefined) {
        localStorage.setItem(
          'Etablissement',
          JSON.stringify(this.MainETablissement)
        );
      }
    });

    if (this.Etablissement) this.EtablissementObject.emit(this.Etablissement);

    this.isAuthenticated = this.AuthService.isAuthenticated();
  }

  Logout() {
    localStorage.clear();
    this.AuthService.changeMessage({
      severity: 'error',
      summary: 'Message',
      detail: 'Logged out',
    });
  }
  SetEtablissementName(Etablissement) {
    localStorage.setItem('Etablissement', JSON.stringify(Etablissement));
    location.reload();
  }

  public PassEtablissement(Object: any): void {
    this.EtablissementObject.emit(Object);
  }
}
