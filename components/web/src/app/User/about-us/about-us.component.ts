import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public environment=environment.APP_URL;
  public Etablissement : any;
  public MapUrl: SafeResourceUrl;
  public VideoURL: SafeResourceUrl;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.Etablissement  = JSON.parse(localStorage.getItem("Etablissement"));
    document.getElementById("description").innerHTML= this.Etablissement.description;

    this.MapUrl= this.sanitizer.bypassSecurityTrustResourceUrl(this.Etablissement.mapLocation);
    this.VideoURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.Etablissement.video);
  }
}
