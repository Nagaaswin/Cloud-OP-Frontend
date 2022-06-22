import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudOpRxStompService } from '../websocket/cloud-op-rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import {
  COPY_PATH,
  COPY_STATUS_SUBSCRIBE_ENDPOINT,
  NO_PROCESS_RUNNING,
} from '../shared/cloud-op.constants';
import { StatusResponse } from '../shared/model/status.model';
import { CopyService } from './copy.service';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css'],
})
export class CopyComponent implements OnInit, OnDestroy {
  private topicSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private cloudOpRxStompService: CloudOpRxStompService,
    private copyService: CopyService
  ) {}

  ngOnInit(): void {
    this.router.navigate([
      { outlets: { primary: COPY_PATH, summary: COPY_PATH } },
    ]);
    this.topicSubscription = this.cloudOpRxStompService
      .watch(COPY_STATUS_SUBSCRIBE_ENDPOINT)
      .subscribe((message: Message) => {
        const statusResponse: StatusResponse = JSON.parse(message.body);
        if (statusResponse.statusMsges != undefined) {
          for (let msg of statusResponse.statusMsges) {
            this.copyService.onMessageReceived(msg);
          }
        } else {
          this.copyService.onMessageReceived(NO_PROCESS_RUNNING);
        }
      });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
}
