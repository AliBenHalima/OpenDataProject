import { AuthService } from './Services/AuthService';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

    canActivate(): boolean {
      if (!this.auth.isAuthenticated() || JSON.parse(localStorage.getItem("user_role"))=="User") {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }


}
