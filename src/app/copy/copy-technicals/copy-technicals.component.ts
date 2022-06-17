import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-copy-technicals',
  templateUrl: './copy-technicals.component.html',
  styleUrls: ['./copy-technicals.component.css'],
})
export class CopyTechnicalsComponent {
  copyForm: FormGroup;
  constructor() {
    this.copyForm = new FormGroup({
      srcId: new FormControl(null, [Validators.required]),
      destId: new FormControl(null, [Validators.required]),
      serviceAccounts: new FormControl(false),
    });
  }

  oncopy() {
    /* TODO document why this method 'oncopy' is empty */
  }
}
