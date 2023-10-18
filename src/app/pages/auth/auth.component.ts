import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, IUser} from "./auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert/alert.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  form: FormGroup;
  user: IUser;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.createForm();
    this.authService.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.createForm();
      }
    })
  }

  onSwitchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  createForm() {
    this.form = this.fb.group({
      email: [this.user && this.user.email || "", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  save() {
    if (this.form.invalid || this.form.untouched) return;

    if (this.isLoginMode) {
      this.authService.signIn(this.form.getRawValue()).subscribe(res => {
        this.alertService.setCurrentAlert("We login successfully", true);
        this.router.navigate(["/recipes"])
      }, error => {
        this.alertService.setCurrentAlert(error, false);
      })
    } else {
      this.authService.signUp(this.form.getRawValue()).subscribe(res => {
        this.router.navigate(["/recipes"])
      }, error => {
        this.alertService.setCurrentAlert(error, false);
      });
    }
  }

}
