import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {AlertService} from "./alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy{

  alertSub: Subscription;
  timerSub: Subscription;
  currentAlert: {message: string, isSuccess: boolean};
  hideAlert: boolean;
  appearance: boolean;

  constructor(
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.alertSub = this.alertService.currentAlert.subscribe(alert => {
      if (alert) this.currentAlert = alert;
    });
    this.timerSub = interval(1000).subscribe(count => {
      switch (count) {
        case 0:
          this.appearance = true;
          break;
        case 2:
        this.hideAlert = true;
          break;
        case 3:
        this.destroyTimer();
        this.alertService.currentAlert.next(null);
          break;
      }
    })
  }

  destroyTimer() {
    this.timerSub.unsubscribe();
  }

  getIcon() {
    if (this.currentAlert.isSuccess) {
      return "assets/images/icons/double-mark.svg";
    } else {
      return "assets/images/icons/cross.svg";
    }
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }
}
