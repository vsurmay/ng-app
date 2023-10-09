import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.createForm();
  }

  onSwitchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  createForm() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
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
