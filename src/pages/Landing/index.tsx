import { ApiLocalStorageGateway } from '../../gateways/api/ApiLocalStorage.gateway';
import { AuthLocalStorageGateway } from '../../gateways/auth/AuthLocalStorage.gateway';

import { ChatFeed } from '../../components/Chat/Feed';

import styles from './index.module.css';

export function LadingPage() {
  return (
    <div className={styles.chat_frame}>
      <ChatFeed
        authGateway={new AuthLocalStorageGateway()}
        apiGateway={new ApiLocalStorageGateway()}
      />
    </div>
  );
}
