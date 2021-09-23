import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Services/AuthService';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token = this._route.snapshot.params['token'];
  error;
  form :FormGroup
  constructor(public AuthService : AuthService,private router:Router,private _route: ActivatedRoute,public messageService : MessageService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl('',[Validators.required]),
      confirm_password: new FormControl('',[Validators.required]),
    })
  }

  SignIn(form:NgForm)
  {

    console.log(form.value);
    this.AuthService.login(this.form.value);
  }
  ResetPassword(){
    console.log(this.form.value);

    this.form.value['token']=this.token;
    this.form.value['email']=localStorage.getItem("email");

    this.AuthService.reset(this.form.value).subscribe((result)=>{
      console.log("result",result.message);
      alert(result.message);
      if (result.success){
        this.AuthService.changeMessage({severity:'success',summary:'success',detail:'Password changed'});
       this.router.navigate(['']);
      }

      this.error= result.message;
 });
  }
}
