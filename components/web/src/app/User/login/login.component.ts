import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/AuthService';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    public AuthService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}
  error;
  token = localStorage.getItem('token');
  ngOnInit(): void {
    this.AuthService.currentToast.subscribe((data: any) => {
      // if (data.length ==0) return ;
      setTimeout(() => {
        this.messageService.add({
          severity: data.severity,
          summary: data.summary,
          detail: data.detail,
        });
      }, 1000);
    });

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  HandleForm() {
    console.log('aefaefaefae');

    console.log(this.form.value);
    this.AuthService.login(this.form.value).subscribe((result) => {
      console.log('res', result);

      if (result.success) {
        // this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
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

        this.AuthService.changeMessage({
          severity: 'success',
          summary: 'success',
          detail: 'Welcome',
        });

        this.router.navigate(['']);
      }
      if (!result.success) {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: result.message,
        });
      }
      this.error = result.message;
    });
  }
  Logout() {
    // window.localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('etablissement_id');
    localStorage.removeItem('role_id');
    localStorage.removeItem('username');
    localStorage.removeItem('photo');

    this.router.navigate(['/Login']);
  }
  Forgot() {}
}
