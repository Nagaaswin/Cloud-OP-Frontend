import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('status') statusSection: ElementRef | undefined;

  constructor(private copyService: CopyService) {}

  ngOnInit() {
    this.subscription = this.copyService.copyStatusMsgs.subscribe(
      (msg: string) => {
        if (msg === NO_PROCESS_RUNNING) {
          clearInterval(this.copyService.statusMsgTask);
          if (!this.copyService.isNoProcessRunning) {
            this.statusMsges.push(NO_PROCESS_RUNNING);
          }
          this.copyService.isNoProcessRunning = true;
        } else {
          this.statusMsges.push(msg);
          this.scrollDown();
        }
      }
    );
  }

  scrollDown() {
    if (this.statusSection != undefined) {
      this.statusSection.nativeElement.scrollTop =
        this.statusSection.nativeElement.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
