import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NO_PROCESS_RUNNING } from 'src/app/shared/cloud-op.constants';
import { CopyService } from '../copy.service';

@Component({
  selector: 'app-copy-status',
  templateUrl: './copy-status.component.html',
  styleUrls: ['./copy-status.component.css'],
})
export class CopyStatusComponent implements OnInit, OnDestroy {
  statusMsges: string[] = [];
  subscription: Subscription = new Subscription();
  constructor(private copyService: CopyService) {}

  ngOnInit() {
    this.subscription = this.copyService.copyStatusMsgs.subscribe(
      (msg: string) => {
        if (msg === NO_PROCESS_RUNNING) {
          clearInterval(this.copyService.statusMsgTask);
          this.copyService.isNoProcessRunning = true;
        }
        this.statusMsges.push(msg);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
