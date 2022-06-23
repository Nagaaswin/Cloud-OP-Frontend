import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudOpRxStompService } from '../websocket/cloud-op-rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import {
  COPY_PATH,
  COPY_STATUS_SUBSCRIBE_ENDPOINT,
  LOCAL_STORAGE_KEY,
  NO_PROCESS_RUNNING,
} from '../shared/cloud-op.constants';
import { StatusResponse } from '../shared/model/status.model';
import { CopyService } from './copy.service';
import { CloudOPSetupService } from '../shared/cloud-op.setup.service';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css'],
})
export class CopyComponent implements OnInit, OnDestroy {
  copyStatusSubscription: Subscription | undefined;
  setupCompletedSubcrip: Subscription | undefined;

  constructor(
    private router: Router,
    private cloudOpRxStompService: CloudOpRxStompService,
    private copyService: CopyService,
    private setupService: CloudOPSetupService
  ) {}

  ngOnInit(): void {
    this.router.navigate([
      { outlets: { primary: COPY_PATH, summary: COPY_PATH } },
    ]);

    this.setupCompletedSubcrip = this.setupService.setupCompleted.subscribe(
      () => {
        this.subscribeCopyStatus();
      }
    );

    if (localStorage.getItem(LOCAL_STORAGE_KEY) != null) {
      this.subscribeCopyStatus();
    }
  }

  subscribeCopyStatus() {
    this.copyStatusSubscription = this.cloudOpRxStompService
      .watch(
        COPY_STATUS_SUBSCRIBE_ENDPOINT + localStorage.getItem(LOCAL_STORAGE_KEY)
      )
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
    this.copyService.onSendMessage();
  }

  ngOnDestroy() {
    if (this.copyStatusSubscription != undefined) {
      this.copyStatusSubscription.unsubscribe();
    }
    if (this.setupCompletedSubcrip != undefined) {
      this.setupCompletedSubcrip.unsubscribe();
    }
    this.copyService.isNoProcessRunning = false;
  }
}
