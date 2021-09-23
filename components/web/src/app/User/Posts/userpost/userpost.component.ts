import { PostService } from './../../../Services/post.service';
import { EvenementsService } from './../../../Services/evenements.service';
import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/Services/document.service';

@Component({
  selector: 'app-userpost',
  templateUrl: './userpost.component.html',
  styleUrls: ['./userpost.component.scss']
})
export class UserpostComponent implements OnInit {


  public Etablissement : any;
  public posts : any;
  public Sujets: Array<any> =[];
  constructor(private DocumentService: DocumentService,private PostService : PostService) { }

  ngOnInit(): void {
    this.Etablissement  = JSON.parse(localStorage.getItem("Etablissement"));
    this.PostService.User_GetAllPosts(this.Etablissement.id).subscribe(result=>{
      this.posts = result.posts;
    })
  }

}
