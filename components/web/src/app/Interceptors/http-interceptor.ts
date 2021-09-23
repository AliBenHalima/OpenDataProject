import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from './../Services/Spinner/spinner.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../Services/AuthService';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
  token = localStorage.getItem('token');
  role_id = localStorage.getItem('role_id') ? localStorage.getItem('role_id') : ""
  constructor(private SpinnerService: SpinnerService,private _snackBar: MatSnackBar,private router :Router,private AuthService: AuthService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

this.SpinnerService.requestStarted();
this.AuthService.watchStorage().subscribe(result=>{
  this.token=localStorage.getItem('token');
})
const headers= new HttpHeaders({
  'Authorization': `Bearer ${this.token}`,
  'role_id':this.role_id
  // 'Access-Control-Allow-Origin':'*'
})
const clone = request.clone({
  headers : headers
})
    return this.handler(next,clone);
  }

  handler(next,clone){
    return next.handle(clone).pipe(
      tap(
        event=>{
          if(event instanceof HttpResponse){
            this.SpinnerService.requestEnded();
          }
        }, (error:HttpErrorResponse)=>{
          this.SpinnerService.resetSpinner();
          // throw error;
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          }
          else if (error.status === 401 || error.status === 403)  {

              this.router.navigate(['/user/AccessDenied']);
              errorMessage="Unauthorized"
          }
          else if (error.status === 404)  {

            this.router.navigate(['/user/PageNotFound404']);
            errorMessage="404 not found"
        }
          else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

            // errorMessage = `Error Code: ${error.status}`;
          }
          this._snackBar.open(errorMessage,'Ok',{
            duration:10000
          });
          // window.alert(errorMessage);
          return throwError(errorMessage);

        }
      )
    );
  }

}
