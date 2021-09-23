import { AuthService } from './../../../Services/AuthService';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommentService } from './../../../Services/comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EvenementsService } from './../../../Services/evenements.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  public environment = environment.APP_URL;
  public event: any;
  public similarEvents: Array<any> = [];
  public Etablissement = JSON.parse(localStorage.getItem('Etablissement'));
  public form: FormGroup;
  public Updateform: FormGroup;
  public displayModal = false;
  public displayLogin: boolean;
  public user_id: any;
  public safeURL: any;
  public comments: any;
  public LoginForm: FormGroup;
  public event_id: Number;
  public isAuthenticated: boolean;
  public Localrole = JSON.parse(localStorage.getItem('user_role'));
  constructor(
    public AuthService: AuthService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private CommentService: CommentService,
    private _route: ActivatedRoute,
    private EvenementsService: EvenementsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.Etablissement = JSON.parse(localStorage.getItem('Etablissement'));
    this.user_id = localStorage.getItem('id');
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.Etablissement.video
    );
    this.isAuthenticated = this.AuthService.isAuthenticated();

    this.form = new FormGroup({
      message: new FormControl(null, [
        Validators.required,
        Validators.maxLength(250),
      ]),
      event_id: new FormControl(this.event_id, [Validators.required]),
    });

    this.Updateform = new FormGroup({
      comment_id: new FormControl(null, [Validators.required]),
      updatedtext: new FormControl(null, [
        Validators.required,
        Validators.maxLength(250),
      ]),
    });

    this._route.params.subscribe((routeParams) => {
      this.event_id = routeParams.event;
      this.GetEvents(this.event_id);
    });
    this.GetEvents(this.event_id);
  }

  GetEvents(id) {
    this.EvenementsService.User_GetEvent(id).subscribe((result) => {
      this.event = result.events;
      this.comments = result.comments;
      this.similarEvents = result.similarEvents;
      this.form.patchValue({ event_id: +this.event_id });
    });
  }

  calculateDiff(start, end) {
    let date1: any = new Date(start);
    let date2: any = new Date(end);
    let diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) return 1;
    return diffDays;
  }

  HandleForm() {
    if (!this.isAuthenticated) {
      this.displayLogin = true;
      return;
    }

    this.CommentService.SaveComment(this.form.value).subscribe(
      (result) => {
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
          detail: 'Comment added',
        });
        this.GetEvents(this.event_id);
        this.form.patchValue({ message: '' });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  hideDialog() {
    this.displayModal = false;
  }

  HideLoginForm() {
    this.displayLogin = false;
  }

  HandleLoginForm() {
    this.AuthService.login(this.LoginForm.value).subscribe(
      (result) => {
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
          detail: 'Comment added',
        });
        localStorage.setItem('token', result.token);
        localStorage.setItem('id', result.id);
        localStorage.setItem('etablissement_id', result.etablissement_id);
        localStorage.setItem('role_id', result.role.role_id);
        localStorage.setItem(
          'isSuperAdmin',
          JSON.stringify(result.isSuperAdmin)
        );
        localStorage.setItem('username', result.username);
        localStorage.setItem('photo', result.photo);
        localStorage.setItem(
          'Etablissements',
          JSON.stringify(result.etablissements)
        );
        localStorage.setItem(
          'user_role',
          JSON.stringify(result.user_role.toString())
        );
        this.HideLoginForm();
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  UpdatedForm() {
    this.CommentService.UpdateComment(this.Updateform.value).subscribe(
      (result) => {
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
          detail: 'Comment updated',
        });
        this.GetEvents(this.event_id);
        this.hideDialog();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  EditComment(comment) {
    this.displayModal = true;
    this.Updateform.patchValue({
      comment_id: comment.id,
      updatedtext: comment.message,
    });
  }

  DeleteComment(comment) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this comment?',
      accept: () => {
        this.CommentService.DeleteComment(comment.id).subscribe(
          (result) => {
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
              detail: 'Comment Deleted',
            });
            this.GetEvents(this.event_id);
            this.hideDialog();
          },
          (err) => {
            console.log(err);
          }
        );
      },
    });
  }

  IsConnectedUser(comment) {
    return this.user_id == comment.user.id;
  }

  Like(comment, is_liked) {
    if (!this.isAuthenticated) {
      this.displayLogin = true;
      return;
    }

    this.CommentService.LikeComment({
      comment_id: comment.id,
      is_liked: is_liked,
    }).subscribe((result) => {
      console.log(result);
      this.GetEvents(this.event_id);
    });
  }

  LikesNumber(comment) {
    return comment.users.filter((e) => e.pivot.is_liked == 1).length;
  }
  DislikesNumber(comment) {
    return comment.users.filter((e) => e.pivot.is_liked == 0).length;
  }

  UserLiked(comment): boolean {
    return comment.users.find(
      (e) => e.pivot.user_id == this.user_id && e.pivot.is_liked == 1
    )
      ? true
      : false;
  }

  UserDisLiked(comment): boolean {
    return comment.users.find(
      (e) => e.pivot.user_id == this.user_id && e.pivot.is_liked == 0
    )
      ? true
      : false;
  }
  countChangedHandler(event) {
    this.displayLogin = event;
    console.log('my event', event);
  }
}
