import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../../../Services/post.service';
import { EtablissementService } from './../../../Services/etablissement.service';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.scss']
})
export class ViewpostComponent implements OnInit {
 post_id = this._route.snapshot.params['post'] ;
 post;
  constructor(private router : Router,private _route: ActivatedRoute,private Location : Location,
    private messageService: MessageService, private fb: FormBuilder,private PostService: PostService) { }

  ngOnInit(): void {
    this.PostService.User_GetPostwithRole(this.post_id).subscribe(result=>{
      this.post = result.posts;
      console.log("aeaze",this.post);
      document.getElementById("description").innerHTML = this.post.description;

    })


  }

  handleCancel(){}
  back(): void {
    this.Location.back()
  }
}
