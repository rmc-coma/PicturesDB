import { Injectable, Inject } from "@angular/core";
import { SessionType } from '@neo9/n9-angular2-session';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

export interface UserType {
    userId: string,
    email: string,
}

export interface UserSessionType extends UserType, SessionType {}

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<UserSessionType>
    {
        return (
            this.http.post(
                "/api/session",
                {
                    email: email,
                    password: password
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
        );
    }
}