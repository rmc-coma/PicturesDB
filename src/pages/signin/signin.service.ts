import { LoginService, UserSessionType } from './../login/login.service';
import { Injectable, Inject } from "@angular/core";
import { SessionType } from '@neo9/n9-angular2-session';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SigninService {
    constructor(private http: HttpClient,
                private loginService: LoginService) {}

    signin(firstname: string, lastname: string, email: string, password: string, code: string): Observable<UserSessionType>
    {
        this.http.post(
            "/api/session",
            {
                email: email,
                password: password,
            }
        ).map(
            (session: any) =>
            {
                return ({
                    userId: session.userId,
                    email: session.email,
                    token: session.accessToken
                });
            }
        )
        return (this.loginService.login(email, password));   
    }
}