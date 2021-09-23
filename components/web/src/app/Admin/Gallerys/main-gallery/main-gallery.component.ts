import { EtablissementService } from './../../../Services/etablissement.service';
import { GalleryService } from './../../../Services/gallery.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { exhaustMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-gallery',
  templateUrl: './main-gallery.component.html',
  styleUrls: ['./main-gallery.component.scss']
})
export class MainGalleryComponent implements OnInit {
  public environment=environment.APP_URL;
  public date: Date;
  public Localrole_id= +localStorage.getItem('role_id') ;
  public etablissements =[];
  public  displayModal;
  public form : FormGroup
  public uploadedFiles=[]
  public Selectedfile;
  public galleries =[]
  public save ;
  public Galleries=[]
  public OriginalGalleries=[]
  public permissions:Array<any>=[];
  public Localetablissement_id= +localStorage.getItem('etablissement_id')
  public  SelectedSearchEtab:any=[];
  public Subject$ = new Subject();



  images: any[]=[];
    // responsiveOptions:any[] = [
    //     {
    //         breakpoint: '1024px',
    //         numVisible: 5
    //     },
    //     {
    //         breakpoint: '768px',
    //         numVisible: 3
    //     },
    //     {
    //         breakpoint: '560px',
    //         numVisible: 1
    //     }
    // ];
    // responsiveOptions2:any[] = [
    //     {
    //         breakpoint: '1500px',
    //         numVisible: 5
    //     },
    //     {
    //         breakpoint: '1024px',
    //         numVisible: 3
    //     },
    //     {
    //         breakpoint: '768px',
    //         numVisible: 2
    //     },
    //     {
    //         breakpoint: '560px',
    //         numVisible: 1
    //     }
    // ];
    displayBasic2: boolean;
    displayCustom:boolean;
    activeIndex: number = 0;


  constructor(private fb: FormBuilder,private confirmationService: ConfirmationService,private messageService : MessageService,private GalleryService : GalleryService,private EtablissementService: EtablissementService) { }

  ngOnInit(): void {
    if(this.Localrole_id!=6) this.SelectedSearchEtab=this.Localetablissement_id;

    this.form = this.fb.group({
      sujet: [''],
      description: [''],
      contenu: [],
      date:'',
      etablissement_id: [''],
    })

  if(this.Localrole_id==6){
    this.FetchEtablissements()
  }else{
    this.FetchGalleries();
  }

  }

  DisplayImages(item){
    this.images=[]
    console.log(item);


    this.images = item.images
    console.log("images",this.images);
    this.displayBasic2= true ;
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
}

  HandleForm(){
    //  if(this.Localetablissement_id) this.SelectedSearchEtab=this.id ;
console.log("up",this.uploadedFiles);

      let formData :FormData = new FormData();
      this.uploadedFiles.forEach(element => {
        formData.append('contenu[]',element, element.name);
      });
      // formData.append('contenu', this.Selectedfile,this.Selectedfile.name);
     formData.append('sujet', this.form.get('sujet').value);
     formData.append('description', this.form.get('description').value);
     formData.append('date', (new Date(this.date)).toUTCString());
     formData.append('etablissement_id', this.SelectedSearchEtab);
    //  formData.append('sujet_document_id', this.form.get('sujet_document_id').value);
     formData.append('_method', 'POST');
     console.log("val form",formData);
    console.log("eeeeeee",formData.getAll("contenu[]"));

      this.GalleryService.AddGallery(formData).subscribe(
        (result) => {

          console.log('Galleries', this.galleries);
          if (!result.success) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: result.message,
            });
            return;
          }
          this.FetchGalleries()
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Gallery added',
          });
  this.displayModal = false;

      },
      (err) => {
        console.log(err);
      }
    );



      // this.AuthService.SignUp(formData).subscribe((result)=>{
      //   console.log("res",result);
      //   if (result.success){
      //     this.AuthService.changeMessage({severity:'success',summary:'success',detail:'User added'});

      //     this.router.navigate(['/users']);
      //   }
      //   else{
      //     console.log('false');
      //     this.messageService.add({severity:'success', summary: 'Success', detail: 'Welcome Ali'});
      //   }
      // });


    }
    FetchEtablissements(){
      this.EtablissementService.Get_Etablissement().subscribe(result=>{
        this.etablissements = result.etablissements
        if(this.Localrole_id==6)
        this.SelectedSearchEtab = result.etablissements[0].id
        this.FetchGalleries();
      })
    }

    FetchGalleries() {
    this.GalleryService.FetchGalleryByEtab(this.SelectedSearchEtab).subscribe(result=>{
      this.Galleries= result.galleries;
      this.OriginalGalleries =result.galleries;
      this.permissions=result.permissionNames.map(e=>e.name);
      console.log("galeries",this.Galleries);
    })
  }


  OnChangeEtab(event){
    this.SelectedSearchEtab = event.value
    console.log("Nani",this.SelectedSearchEtab);

   this.Galleries=  this.OriginalGalleries;
  if(event.value!=null)
    this.Galleries = this.Galleries.filter((element=> element.etablissement_id == event.value))



  }
  hideDialog() {
    this.displayModal = false;
this.uploadedFiles =[]
    // this.update = false;
    // this.save = false;
  }
  onSelect(event) {
    event.currentFiles.forEach(element => {
      this.uploadedFiles.push(element)
      // this.Selectedfile.element.name = element
    });
    // this.uploadedFiles.push(event.currentFiles[0]);
    // this.Selectedfile =event.currentFiles[0];
  console.log("uploaded",this.uploadedFiles);

}

openNew() {
  console.log(this.SelectedSearchEtab);

  if(this.SelectedSearchEtab==null && this.Localrole_id == 6){
    alert("Select an etablissement")
    return ;
}
this.SelectedSearchEtab= +this.Localetablissement_id;
this.save = true;
  this.displayModal = true;
  this.form.patchValue({
    sujet: '',
    description: '',
    contenu:[],
    date:'',
    etablissement_id: '',
  });
}

onRemoveImage(event){
  console.log(event);
  let index = this.uploadedFiles.indexOf(event.file)
  console.log(index);
   this.uploadedFiles.splice(index,1)
  console.log(this.uploadedFiles,"new");
}

DeleteGallery(gallery){
  this.confirmationService.confirm({
    message: 'Are you sure that you want to Delete this Gallery?',
    accept: () => {
      this.GalleryService.DeleteGallery(gallery.id).subscribe(result=>{
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
          detail: 'Gallery Deleted',
        });
        this.Galleries = this.Galleries.filter((element) => element.id != gallery.id);
        // this.OriginalDocs = this.OriginalDocs.filter((element) => element.id != id);
      });
    },
  });


}

}
