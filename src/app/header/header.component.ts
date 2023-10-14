import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, IUser} from "../pages/auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  user: IUser | null;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    })
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/auth"]);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
