import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  LOCAL_STORAGE_KEY,
  CLOUD_OP_APPLICATION_PATH,
  SETUP_ENDPOINT,
} from './cloud-op.constants';
import { User } from './model/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CloudOPSetupService {
  constructor(private http: HttpClient) {}

  appSetup() {
    this.http
      .post<User>(
        environment.cloudOpBaseUrl + CLOUD_OP_APPLICATION_PATH + SETUP_ENDPOINT,
        new User()
      )
      .subscribe((responseData) => {
        console.log(responseData);
        if (responseData.userId != null) {
          localStorage.setItem(LOCAL_STORAGE_KEY, responseData.userId);
        }
      });
  }
}
