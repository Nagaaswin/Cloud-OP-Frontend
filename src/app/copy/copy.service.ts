import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  COPY_STATUS_SUBSCRIBE_ENDPOINT,
  NO_PROCESS_RUNNING,
  COPY_STATUS_PUBLISH_ENDPOINT,
} from '../cloud-op-constants';
import { StatusResponse } from '../model/status.model';
import { User } from '../model/user.model';
import { CloudOpRxStompService } from '../websocket/cloud-op-rx-stomp.service';
import { Message } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class CopyService {
  copyStatusMsgs = new Subject<string>();
  constructor(private cloudOpRxStompService: CloudOpRxStompService) {}

  onMessageReceived(msg: string) {
    this.copyStatusMsgs.next(msg);
  }

  onSendMessage() {
    this.cloudOpRxStompService.publish({
      destination: COPY_STATUS_PUBLISH_ENDPOINT,
      body: JSON.stringify(new User()),
    });
  }
}
