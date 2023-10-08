import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authService.getUserWithLocaleStorage();
    const modifierRequest = req.clone({
      params: new HttpParams().set("auth", user ? user.idToken : "")
    })

    return next.handle(modifierRequest);
  }
}
