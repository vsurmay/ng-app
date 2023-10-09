import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../shared/environment";
import {BehaviorSubject, catchError, Subject, tap, throwError} from "rxjs";

interface IAuthResponse {
  email: string,
  expiresIn: string,
  idToken: string,
  kind: string,
  localId: string,
  refreshToken: string,
  displayName?: string,
  registered?: boolean
}

export interface IUser {
  email: string,
  localId: string,
  idToken: string,
  expiresIn: number
}

@Injectable()
export class AuthService {

  user = new BehaviorSubject<IUser | null>(null)

  constructor(
    private http: HttpClient
  ) {
  }

  signUp(registrationData: { email: string, password: string }) {
    return this.http.post<IAuthResponse>(`${environment.authBasePath}/accounts:signUp?key=${environment.apiKey}`, {
      ...registrationData,
      returnSecureToken: true
    }).pipe(catchError(err => {
      let errorMessage = "Something went wrong"
      if (!err.error && !err.error.error) {
        return throwError(errorMessage);
      }
      switch (err.error.error.message) {
        case "EMAIL_EXISTS":
          errorMessage = "This email is already registered"
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          errorMessage = "Too many attempts try later"
          break;
        default:
          errorMessage = "Something went wrong";
      }
      return throwError(errorMessage);
    }), tap(res => {
      this.tapPipeForAuth(res);
    }))
  }

  signIn(registrationData: { email: string, password: string }) {
    return this.http.post<IAuthResponse>(`${environment.authBasePath}/accounts:signInWithPassword?key=${environment.apiKey}`, {
      ...registrationData,
      returnSecureToken: true
    }).pipe(catchError(err => {
      let errorMessage = "Something went wrong"
      if (!err.error && !err.error.error) {
        return throwError(errorMessage);
      }
      switch (err.error.error.message) {
        case "INVALID_LOGIN_CREDENTIALS":
          errorMessage = "Incorrect data entered"
          break;
        case "EMAIL_NOT_FOUND":
          errorMessage = "Email not found"
          break;
        case "INVALID_PASSWORD":
          errorMessage = "Invalid password"
          break;
        default:
          errorMessage = "Something went wrong";
      }
      return throwError(errorMessage);
    }), tap(res => {
      this.tapPipeForAuth(res);
    }))
  }

  private tapPipeForAuth(res: IAuthResponse) {
    const user: IUser = {
      email: res.email,
      localId: res.localId,
      idToken: res.idToken,
      expiresIn: new Date().getTime() + Number(res.expiresIn) * 1000
    }
    this.user.next(user);
    this.setUserToLocaleStorage();
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("user");
  }

  setUserToLocaleStorage() {
    this.user.subscribe(user => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    })
  }

  getUserWithLocaleStorage() {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      this.user.next(JSON.parse(userJson));
      return JSON.parse(userJson) as IUser;
    }
    return null;
  }
}
