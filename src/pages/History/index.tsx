import { useMemo } from 'react';

import type { IApiGateway } from '../../gateways/api/Api.gateway.interface';
import type { IAuthGateway } from '../../gateways/auth/Auth.gateway.interface';

import { useBotStore } from '../../store/botStore';

import { SignInForm } from '../../components/AccessForm';
import { Download } from '../../components/Download';

import styles from './index.module.css';

type HistoryPageProps = {
  apiGateway: IApiGateway;
  authGateway: IAuthGateway;
};

export function HistoryPage({ apiGateway, authGateway }: HistoryPageProps) {
  const { currentAuthor } = useBotStore();

  const hasAuthor = useMemo(() => currentAuthor !== null, [currentAuthor]);

  return (
    <div className={styles.hitory_Container}>
      {hasAuthor ? (
        <Download apiGateway={apiGateway} />
      ) : (
        <SignInForm authGateway={authGateway} />
      )}
    </div>
  );
}
