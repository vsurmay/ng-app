import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService, IAlert} from "./alert/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  alertSub: Subscription;
  alert: IAlert | null;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertSub = this.alertService.currentAlert.subscribe(alert => {
      this.alert = alert;
    })
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }

}
