import { ApiLocalStorageGateway } from '../../gateways/api/ApiLocalStorage.gateway';
import { AuthLocalStorageGateway } from '../../gateways/auth/AuthLocalStorage.gateway';

import { ChatFeed } from '../../components/Chat/Feed';

import styles from './index.module.css';

type LadgingPageProps = {
  apiGateway: ApiLocalStorageGateway;
  authGateway: AuthLocalStorageGateway;
};

export function LadingPage({ apiGateway, authGateway }: LadgingPageProps) {
  return (
    <div className={styles.chat_frame}>
      <ChatFeed apiGateway={apiGateway} authGateway={authGateway} />
    </div>
  );
}
