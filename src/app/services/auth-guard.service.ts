import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserSession } from '../_models/UserSession';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    let authInfo = {
      authenticated: false
    };

    if (!UserSession.getUserSession().userInfo) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
