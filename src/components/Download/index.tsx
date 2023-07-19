import type { IApiGateway } from '../../gateways/api/Api.gateway.interface';

import { useBotStore } from '../../store/botStore';

import { transformToCSV } from './index.service';
import { downloadFile } from '../../utils/helpers';

import styles from './index.module.css';

type DownloadProps = {
  apiGateway: IApiGateway;
};

export function Download({ apiGateway }: DownloadProps) {
  const { currentAuthor } = useBotStore();

  const download = async () => {
    if (!currentAuthor) return;

    const conversations = await apiGateway.getConversations(currentAuthor.id);
    const csvConversations = transformToCSV(conversations);

    await downloadFile({
      data: csvConversations,
      fileName: `${currentAuthor.name}-conversations.csv`,
      type: 'text/csv',
    });
  };

  return (
    <button type="button" className={styles.download_btn} onClick={download}>
      Download
    </button>
  );
}
