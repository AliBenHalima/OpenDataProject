import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/AuthService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  error;
  constructor(public AuthService: AuthService, private router: Router) {}
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  ForgotPassword() {
    this.AuthService.Forgot(this.form.value).subscribe((result) => {
      if (result.success) {
        localStorage.setItem('email', this.form.get('email').value);
        this.AuthService.changeMessage({
          severity: 'success',
          summary: 'success',
          detail: 'Please check your email',
        });
        this.router.navigate(['/Login']);
      }
      this.error = result.message;
    });
  }
}
