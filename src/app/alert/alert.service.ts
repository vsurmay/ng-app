import {BehaviorSubject, Subject} from "rxjs";

export interface IAlert {
  message: string,
  isSuccess: boolean
}

export class AlertService {
  currentAlert = new BehaviorSubject<IAlert | null>(null);

  setCurrentAlert(message: string, isSuccess: boolean) {
    this.currentAlert.next({message, isSuccess});
  }

}
