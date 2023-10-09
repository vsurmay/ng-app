import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import * as moment from "moment";
import {now} from "moment";
import {AlertService} from "../../alert/alert.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.getUserWithLocaleStorage();
    if (user) {
      if (moment.unix(user.expiresIn) <= moment.unix(now())) {
        this.authService.logout();
        this.router.navigate(["/auth"]);
        this.alertService.setCurrentAlert("We must login again", true);
      }
    }
    if (!user) {
      this.router.navigate(["/auth"]);
    }
    return !!user;

  }
}
