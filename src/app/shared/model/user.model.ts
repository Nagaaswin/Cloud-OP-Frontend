import { LOCAL_STORAGE_KEY } from '../cloud-op.constants';

export class User {
  public userId: string | null;

  constructor() {
    this.userId = localStorage.getItem(LOCAL_STORAGE_KEY);
  }
}
