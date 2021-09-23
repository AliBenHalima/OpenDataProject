import { DomSanitizer } from '@angular/platform-browser';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommentService } from './../../../Services/comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EvenementsService } from './../../../Services/evenements.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: any;
  @Input() event_id!: Number;

  public environment = environment.APP_URL;
  public event: any;
  public similarEvents: Array<any> = [];
  public Etablissement: any;
  public form: FormGroup;
  public Updateform: FormGroup;
  public displayModal = false;
  public user_id: any;
  public safeURL: any;

  constructor(
    private _sanitizer: DomSanitizer,
    private router: Router,
    private CommentService: CommentService,
    private _route: ActivatedRoute,
    private EvenementsService: EvenementsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.Etablissement = JSON.parse(localStorage.getItem('Etablissement'));
    this.user_id = localStorage.getItem('id');

    this.Updateform = new FormGroup({
      comment_id: new FormControl(null, [Validators.required]),
      updatedtext: new FormControl(null, [
        Validators.required,
        Validators.maxLength(250),
      ]),
    });
  }

  GetEvents(id) {
    this.EvenementsService.GetEvent(id).subscribe((result) => {
      this.event = result.events;
      this.similarEvents = result.similarEvents;
      this.form.patchValue({ event_id: +this.event_id });
    });
  }

  DeleteComment(comment) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this comment?',
      accept: () => {
        this.CommentService.DeleteComment(comment.pivot.id).subscribe(
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

  hideDialog() {
    this.displayModal = false;
  }
  IsConnectedUser(comment) {
    return this.user_id == comment.id;
  }

  Like(comment, is_liked) {
    this.CommentService.LikeComment({
      comment_id: comment.pivot.id,
      is_liked: is_liked,
    }).subscribe((result) => {
      console.log(result);
    });
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
      comment_id: comment.pivot.id,
      updatedtext: comment.pivot.message,
    });
  }
}
