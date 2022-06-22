import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  LOCAL_STORAGE_KEY,
  SETUP_ENDPOINT,
  STATUS_CALL_INTERVAL_IN_MS,
} from './cloud-op.constants';
import { User } from './model/user.model';
import { Injectable } from '@angular/core';
import { CopyService } from '../copy/copy.service';

@Injectable({
  providedIn: 'root',
})
export class CloudOPSetupService {
  constructor(private http: HttpClient, private copyService: CopyService) {}

  appSetup() {
    this.http
      .post<User>(environment.cloudOpBaseUrl + SETUP_ENDPOINT, new User())
      .subscribe((responseData) => {
        this.setupCopyService();
        if (responseData.userId != null) {
          localStorage.setItem(LOCAL_STORAGE_KEY, responseData.userId);
        }
      });
  }

  private setupCopyService() {
    this.copyService.onSendMessage();
    this.copyService.statusMsgTask = setInterval(
      this.copyService.onSendMessage,
      STATUS_CALL_INTERVAL_IN_MS
    );
  }
}
