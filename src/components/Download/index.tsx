import { toast } from 'react-toastify';

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
    try {
      if (!currentAuthor) throw new Error('Author must be authenticated');

      const conversations = await apiGateway.getConversations(currentAuthor.id);
      const csvConversations = transformToCSV(conversations);

      await downloadFile({
        data: csvConversations,
        fileName: `${currentAuthor.name}-conversations.csv`,
        type: 'text/csv',
      });
    } catch (error: any) {
      let message = 'An error occurred while downloading the file';

      if (error instanceof Error) message = error.message;

      toast(message, { type: 'error' });
    }
  };

  return (
    <button type="button" className={styles.download_btn} onClick={download}>
      Download
    </button>
  );
}
