import { CloudOpRxStompService } from './cloud-op-rx-stomp.service';
import { CloudOpRxStompConfig } from './cloud-op-stomp.config';

export function cloudOPrxStompServiceFactory() {
  const rxStomp = new CloudOpRxStompService();
  rxStomp.configure(CloudOpRxStompConfig);
  rxStomp.activate();
  return rxStomp;
}
