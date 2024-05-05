import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser, User } from '../app/models/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(userData: RegisterUser): Observable<void> {
    return this.http.post<void>(`${environment.backendUrl}users`, userData);
  }

  getUserByUuid(uuid: string): Observable<User> {
    return this.http.get<User>(`${environment.backendUrl}users/${uuid}`);
  }
}
