import { EtablissementService } from './../../Services/etablissement.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  environment=environment.APP_URL;

  Etablissements=[]
  public username = localStorage.getItem('username')
  public photo =localStorage.getItem('photo')
  public user = JSON.parse(localStorage.getItem('user'))
  constructor(private EtablissementService :EtablissementService) { }

  ngOnInit(): void {
    // this.EtablissementService.Get_Etablissement().subscribe(result=>{
    //   this.Etablissements = result.etablissements
    // })
  }

}
