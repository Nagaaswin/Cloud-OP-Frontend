import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CopyService } from './copy/copy.service';
import { CloudOPSetupService } from './shared/cloud-op.setup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Cloud-OP';
  setupSubscription: Subscription | undefined;
  constructor(
    private setupService: CloudOPSetupService,
    private copyService: CopyService
  ) {}

  ngOnInit(): void {
    this.setupSubscription = this.setupService.appSetup().subscribe((user) => {
      this.setupService.assignLocalStorage(user);
      this.setupService.setupCompleted.next(true);
      this.copyService.setupCopyStatusReq();
    });
  }

  ngOnDestroy(): void {
    if (this.setupSubscription != undefined) {
      this.setupSubscription.unsubscribe();
    }
  }
}
