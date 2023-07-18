import { useMemo } from 'react';

import { useBotStore } from '../../store/botStore';

import { SignInForm } from '../../components/AccessForm';

import styles from './index.module.css';
import { AuthLocalStorageGateway } from '../../gateways/auth/AuthLocalStorage.gateway';

export function HistoryPage() {
  const { currentAuthor } = useBotStore();

  const hasAuthor = useMemo(() => currentAuthor !== null, [currentAuthor]);

  return (
    <div className={styles.hitory_Container}>
      {hasAuthor ? (
        currentAuthor?.name
      ) : (
        <SignInForm authGateway={new AuthLocalStorageGateway()} />
      )}
    </div>
  );
}
