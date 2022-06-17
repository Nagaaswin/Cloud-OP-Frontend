import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
        this.statusMsges.push(msg);
      }
    );
    this.copyService.onSendMessage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
