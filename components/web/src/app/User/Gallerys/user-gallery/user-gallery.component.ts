import { GalleryService } from './../../../Services/gallery.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.scss'],
})
export class UserGalleryComponent implements OnInit {
  public environment = environment.APP_URL;
  public Etablissement: any;
  public Galleries: Array<any> = [];
  display: any;
  SelectedGallery;
  constructor(private GalleryService: GalleryService) {}

  ngOnInit(): void {
    this.Etablissement = JSON.parse(localStorage.getItem('Etablissement'));
    this.GalleryService.User_GetGalleriesByEtab(
      this.Etablissement.id
    ).subscribe((result) => {
      this.Galleries = result.Gallery;
    });
  }

  public PassEtablissement(event: any): void {
    console.log('ee', event);
    this.Etablissement = event;
  }

  hideDialog() {
    this.display = false;
  }

  openNew(Gallery) {
    this.display = true;
    this.SelectedGallery = Gallery;
    console.log(this.SelectedGallery);
  }
}
