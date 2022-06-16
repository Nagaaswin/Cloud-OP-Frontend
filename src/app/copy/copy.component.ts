import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudOpRxStompService } from '../websocket/cloud-op-rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import {
  COPY_PATH,
  COPY_STATUS_PUBLISH_ENDPOINT,
  COPY_STATUS_SUBSCRIBE_ENDPOINT,
} from '../cloud-op-constants';
import { User } from '../model/user.model';
import { StatusResponse } from '../model/status.model';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css'],
})
export class CopyComponent implements OnInit, OnDestroy {
  copyStatusMsgs: string[] = [];
  private topicSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private cloudOpRxStompService: CloudOpRxStompService
  ) {}

  ngOnInit(): void {
    this.router.navigate([
      { outlets: { primary: COPY_PATH, summary: COPY_PATH } },
    ]);
    this.topicSubscription = this.cloudOpRxStompService
      .watch(COPY_STATUS_SUBSCRIBE_ENDPOINT)
      .subscribe((message: Message) => {
        const statusResponse: StatusResponse = JSON.parse(message.body);
        for (let msg of statusResponse.statusMsges) {
          this.copyStatusMsgs.push(msg);
        }
      });
    this.onSendMessage();
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
    this.cloudOpRxStompService.publish({
      destination: COPY_STATUS_PUBLISH_ENDPOINT,
      body: JSON.stringify(new User()),
    });
  }
}
