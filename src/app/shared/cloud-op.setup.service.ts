import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LOCAL_STORAGE_KEY, SETUP_ENDPOINT } from './cloud-op.constants';
import { User } from './model/user.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloudOPSetupService {
  setupCompleted = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  appSetup(): Observable<User> {
    return this.http.post<User>(
      environment.cloudOpBaseUrl + SETUP_ENDPOINT,
      new User()
    );
  }

  assignLocalStorage(user: User) {
    if (user.userId != null) {
      localStorage.setItem(LOCAL_STORAGE_KEY, user.userId);
    }
  }
}
