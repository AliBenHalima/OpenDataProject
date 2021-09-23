import { PostService } from './../../../Services/post.service';
import { MessageService } from 'primeng/api';
import { EtablissementService } from './../../../Services/etablissement.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss'],
})
export class EditpostComponent implements OnInit {
  form: FormGroup;
  uploadedFiles: any[] = [];
  Selectedfile: any = {};
  post_id: string;
  CurrentPost;
  description;

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder,
    private PostService: PostService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      sujet: [''],
      description: [''],
      piece: [],
      etablissement_id: [''],
    });
    this.post_id = this._route.snapshot.params['post'];
    this.PostService.GetPost(this.post_id).subscribe((result) => {
      this.CurrentPost = result.posts;
      this.description = this.CurrentPost.description;
      this.form.patchValue({
        name: this.CurrentPost.name,
        sujet: this.CurrentPost.sujet,
        description: this.CurrentPost.description,
        etablissement_id: this.CurrentPost.etablissement_id,
      });
    });
  }

  Handleform() {
    let formData: FormData = new FormData();
    this.uploadedFiles.forEach((element) => {
      formData.append('piece[]', element, element.name);
    });
    formData.append('id', this.post_id);
    formData.append('name', this.form.get('name').value);
    formData.append('sujet', this.form.get('sujet').value);
    formData.append('description', this.form.get('description').value);
    formData.append('etablissement_id', this.CurrentPost.etablissement_id);
    formData.append('_method', 'POST');

    this.PostService.Editpost(this.post_id, formData).subscribe((result) => {
      console.log('res', result);
      if (result.success) {
        this.router.navigate(['/posts']);
      }
    });
  }

  onSelect(event) {
    event.currentFiles.forEach((element) => {
      this.uploadedFiles.push(element);
    });
    console.log('uploaded', this.uploadedFiles);
  }

  handleCancel() {}
  onRemoveImage(event) {
    console.log(event);
    let index = this.uploadedFiles.indexOf(event.file);
    console.log(index);
    this.uploadedFiles.splice(index, 1);
    console.log(this.uploadedFiles, 'new');
  }
}
