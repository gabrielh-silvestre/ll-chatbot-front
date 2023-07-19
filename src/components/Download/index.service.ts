import { format } from 'date-fns';

import type { Conversation } from '../../utils/types';

export const transformToCSV = (data: Conversation[]) => {
  const header = 'Conversation;Finished at';

  const csv = data.map((conversation, i) => {
    const { author, finishedAt } = conversation;

    if (!finishedAt) return 'ERROR;ERROR';

    const date = format(new Date(finishedAt), 'dd/MM/yyyy HH:mm');
    return `Conversation ${author.name} #${i + 1};${date}`;
  });

  return [header, ...csv].join('\n');
};
