import { Component, OnInit } from '@angular/core';
import { CloudOPSetupService } from './shared/cloud-op.setup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Cloud-OP';
  constructor(private setupService: CloudOPSetupService) {}
  ngOnInit(): void {
    this.setupService.appSetup();
  }
}
