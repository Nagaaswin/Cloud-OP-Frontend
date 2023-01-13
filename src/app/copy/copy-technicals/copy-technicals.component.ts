import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CopyRequest } from 'src/app/shared/model/copy.request.model';
import { CopyService } from '../copy.service';

@Component({
  selector: 'app-copy-technicals',
  templateUrl: './copy-technicals.component.html',
  styleUrls: ['./copy-technicals.component.css'],
})
export class CopyTechnicalsComponent {
  copyForm: FormGroup;
  constructor(private copyService: CopyService) {
    this.copyForm = new FormGroup({
      srcId: new FormControl(null, [Validators.required]),
      destId: new FormControl(null, [Validators.required]),
      serviceAccounts: new FormControl(false),
      fileCopy: new FormControl(false),
      fileName: new FormControl(null),
    });
  }

  isNoProcessRunning(): boolean {
    return this.copyService.isNoProcessRunning;
  }

  oncopy() {
    if (this.copyForm.valid && this.isNoProcessRunning()) {
      this.updateRequestState();
      const copyData = this.copyForm.value;
      const copyReq = new CopyRequest(
        copyData.srcId,
        copyData.destId,
        copyData.serviceAccounts
      );
      if (copyData.fileCopy) {
        copyReq.fileCopy = copyData.fileCopy;
        copyReq.fileName = copyData.fileName;
      }
      this.copyService.startCopying(copyReq);
    }
  }

  onCancel() {
    if (!this.isNoProcessRunning()) {
      this.updateRequestState();
      this.copyService.stopCopying();
    }
  }

  isRequestSuccess(): boolean {
    if (this.copyService.isCopySuccess) {
      return true;
    }
    return false;
  }

  isRequestFailed(): boolean {
    if (this.copyService.isTechinalError) {
      return true;
    }
    return false;
  }

  private updateRequestState() {
    this.copyService.isCopySuccess = false;
    this.copyService.isTechinalError = false;
  }
}
