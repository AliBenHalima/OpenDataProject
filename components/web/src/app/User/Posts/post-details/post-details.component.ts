import { PostService } from './../../../Services/post.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommentService } from './../../../Services/comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EvenementsService } from './../../../Services/evenements.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  public environment = environment.APP_URL;

  public post: any;
  public similarEvents: Array<any> = [];
  public Etablissement: any;
  public Updateform: FormGroup;
  public displayModal = false;
  public user_id: any;
  public post_id: Number;
  public event = [];
  constructor(
    private Location: Location,
    private router: Router,
    private CommentService: CommentService,
    private _route: ActivatedRoute,
    private PostService: PostService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.Etablissement = JSON.parse(localStorage.getItem('Etablissement'));
    this.user_id = localStorage.getItem('id');

    this._route.params.subscribe((routeParams) => {
      this.post_id = routeParams.post;
      this.GetPosts(this.post_id);
    });
    this.GetPosts(this.post_id);
  }

  GetPosts(id) {
    this.PostService.User_GetPostwithRole(this.post_id).subscribe((result) => {
      this.post = result.posts;
      console.log('aeaze', this.post);
      document.getElementById('description').innerHTML = this.post.description;
    });
  }

  IsConnectedUser(comment) {
    return this.user_id == comment.id;
  }
  back(): void {
    this.Location.back();
  }
}
