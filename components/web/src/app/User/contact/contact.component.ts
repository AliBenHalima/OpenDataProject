import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Services/AuthService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form : FormGroup;
  Etablissement:any;
  constructor( private fb: FormBuilder, private router : Router, private AuthService : AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.Etablissement  = JSON.parse(localStorage.getItem("Etablissement"));
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      sujet: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  Handleform(){

    this.AuthService.ContactMail(this.form.value).subscribe((result)=>{
      console.log("res",result);
      if (result.success){
        this.AuthService.changeMessage({severity:'success',summary:'success',detail:'Mail sent successfully '});

        this.router.navigate(['../../']);
      }
      if (!result.success) {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: result.message,
        });
        return;
      }

    });

  }

}
