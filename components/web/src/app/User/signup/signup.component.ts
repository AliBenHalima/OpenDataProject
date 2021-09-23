import { MessageService } from 'primeng/api';
import { AuthService } from './../../Services/AuthService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form : FormGroup;
  Selectedfile:any;
  uploadedFiles: any[] = [];
  constructor( private fb: FormBuilder, private router : Router, private AuthService : AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      photo : ['',],
    })
  }


  Handleform(){
    console.log("Form",this.form.get('email').value);

    let formData :FormData = new FormData();
    formData.append('photo', this.Selectedfile,this.Selectedfile.name);
    formData.append('name', this.form.get('name').value);
    formData.append('email', this.form.get('email').value);
    formData.append('address', this.form.get('address').value);
    formData.append('password', this.form.get('password').value);
    formData.append('etablissement_id',JSON.parse(localStorage.getItem("Etablissement")).id);

    console.log("val form",formData);
    this.AuthService.UserSignUp(formData).subscribe((result)=>{
      console.log("res",result);
      if (result.success){
        this.AuthService.changeMessage({severity:'success',summary:'success',detail:'User added'});

        this.router.navigate(['/Login']);
      }
      else{
        console.log('false');
        this.messageService.add({severity:'error', summary: 'Success', detail: 'Please try again'});
      }
    });
  }

  onSelect(event) {
    this.uploadedFiles.push(event.currentFiles[0]);
    this.Selectedfile =event.currentFiles[0];

}

}
