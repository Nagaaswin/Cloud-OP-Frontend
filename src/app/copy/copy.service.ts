import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  COPY_ENDPOINT,
  COPY_STATUS_PUBLISH_ENDPOINT,
  LOCAL_STORAGE_KEY,
  CLOUD_OP_APPLICATION_PATH,
  STOP_ENDPOINT,
  STATUS_CALL_INTERVAL_IN_MS,
  RESPONSE_MSG_TIMEOUT_IN_MS,
} from '../shared/cloud-op.constants';
import { CopyRequest } from '../shared/model/copy.request.model';
import { User } from '../shared/model/user.model';
import { CloudOpRxStompService } from '../websocket/cloud-op-rx-stomp.service';

@Injectable({
  providedIn: 'root',
})
export class CopyService {
  copyStatusMsgs = new Subject<string>();
  isNoProcessRunning: boolean = false;
  isTechinalError: boolean = false;
  isCopySuccess: boolean = false;
  statusMsgTask: any;
  constructor(
    private cloudOpRxStompService: CloudOpRxStompService,
    private http: HttpClient
  ) {}

  onMessageReceived(msg: string) {
    this.copyStatusMsgs.next(msg);
  }

  onSendMessage() {
    this.cloudOpRxStompService.publish({
      destination: COPY_STATUS_PUBLISH_ENDPOINT,
      body: JSON.stringify(new User()),
    });
  }

  startCopying(copyReq: CopyRequest) {
    console.log(copyReq);
    this.http
      .post<User>(
        environment.cloudOpBaseUrl + CLOUD_OP_APPLICATION_PATH + COPY_ENDPOINT,
        copyReq
      )
      .pipe(catchError(this.handleError))
      .subscribe((responseData) => {
        this.statusMsgTask = setInterval(
          this.onSendMessage,
          STATUS_CALL_INTERVAL_IN_MS
        );
        this.isCopySuccess = true;
        if (responseData.userId != null) {
          localStorage.setItem(LOCAL_STORAGE_KEY, responseData.userId);
        }
        setTimeout(() => {
          this.isCopySuccess = false;
        }, RESPONSE_MSG_TIMEOUT_IN_MS);
      });
  }

  stopCopying() {
    this.http
      .post<string>(
        environment.cloudOpBaseUrl +
          CLOUD_OP_APPLICATION_PATH +
          COPY_ENDPOINT +
          STOP_ENDPOINT,
        new User()
      )
      .pipe(catchError(this.handleError))
      .subscribe((responseData) => {
        clearInterval(this.statusMsgTask);
        console.log('Stop Copy response -> ' + responseData);
      });
  }

  private handleError(error: HttpErrorResponse) {
    this.isTechinalError = true;
    if (error.status === 0) {
      console.error('An Network error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('There is some technical error; please try again.')
    );
  }
}
