import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from './../../../Services/gallery.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.scss']
})
export class EditGalleryComponent implements OnInit {
  public environment=environment.APP_URL;
  public save : boolean;
  public Gallery : Array<any> = [];
  public  displayModal;
  public form : FormGroup;
  public date: Date;
  public gallery_id;
  public CurrentGallery;
  public images =[]
  uploadedFiles=[]
  Selectedfile;
  constructor(private router : Router,private _route: ActivatedRoute,private confirmationService: ConfirmationService,private messageService : MessageService,private GalleryService : GalleryService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      sujet: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
    });

    this.gallery_id = this._route.snapshot.params['gallery'] ;
  this.fetchGalery();


  }



  openNew(){

  }
  fetchGalery(){
    this.GalleryService.GetGalleryByID(this.gallery_id).subscribe(gallery => {
      this.CurrentGallery = gallery.galleries;
      this.images = gallery.galleries.images;

      console.log("images",this.CurrentGallery);

      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      this.form.patchValue({
        sujet: this.CurrentGallery.sujet,
        description:this.CurrentGallery.description,
        date:new Date(this.CurrentGallery.date)
        });

      console.log("CurrentGallery is", this.CurrentGallery );
     });
  }

  hideDialog(){

  }

  onSelect(event){
   event.currentFiles.forEach(element => {
      this.uploadedFiles.push(element)
    });
  console.log("uploaded",this.uploadedFiles);
  // this.uploadedFiles.push(event.currentFiles[0]);
  // this.Selectedfile =event.currentFiles[0];



}

onRemoveImage(event){
  console.log(event);
  let index = this.uploadedFiles.indexOf(event.file)
  console.log(index);
   this.uploadedFiles.splice(index,1)
  console.log(this.uploadedFiles,"new");

}
onUpload(event){
  let formData = new FormData();

  this.uploadedFiles.forEach(element => {
    formData.append('contenu[]',element, element.name);
  });

  formData.append('_method', 'POST');

  this.GalleryService.AddImage(this.CurrentGallery.id,formData).subscribe(result=>{
    console.log(result);

  })
  this.fetchGalery();
}

  Delete(image){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this image?',
      accept: () => {
        this.GalleryService.DeleteImage(image.id).subscribe((result) => {
          if (!result.success) {
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
            detail: 'Image Deleted',
          });
          this.images = this.images.filter((element) => element.id != image.id);
          // this.OriginalDocs = this.OriginalDocs.filter((element) => element.id != id);
        });
      },
    });
  }
Editform(){
  console.log("val form",this.form.value);
  this.GalleryService.EditGallery(this.CurrentGallery.id,this.form.value).subscribe((result)=>{
    console.log("res",result);
    if (result.success){
      this.router.navigate(['/gallery']);
    }
    else{
      console.log('false');
      this.messageService.add({ severity: 'error',
      summary: 'error',
      detail: result.message});
    }




  });
}


}
