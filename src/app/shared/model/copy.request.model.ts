import { User } from './user.model';

export class CopyRequest {
  srcId: string;
  destId: string;
  serviceAccounts: boolean;
  user: User;
  constructor(srcId: string, destId: string, serviceAccounts: boolean) {
    this.srcId = srcId;
    this.destId = destId;
    this.serviceAccounts = serviceAccounts;
    this.user = new User();
  }
}
