import { User } from './user.model';

export class CopyRequest {
  srcId: string;
  destId: string;
  serviceAccounts: boolean;
  fileCopy: boolean | undefined;
  fileName: string | undefined;
  user: User;
  constructor(srcId: string, destId: string, serviceAccounts: boolean) {
    this.srcId = srcId;
    this.destId = destId;
    this.serviceAccounts = serviceAccounts;
    this.user = new User();
  }

  setFileCopy(fileCopy: boolean) {
    this.fileCopy = fileCopy;
  }

  setFileName(fileName: string) {
    this.fileName = fileName;
  }
}
