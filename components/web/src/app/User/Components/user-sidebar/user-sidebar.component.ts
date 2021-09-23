import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
public Etablissement:any;
public safeURL : any;
  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.Etablissement  = JSON.parse(localStorage.getItem("Etablissement"));
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.Etablissement.video);

  }

}
