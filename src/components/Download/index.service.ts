import { format } from 'date-fns';

import type { Conversation } from '../../utils/types';

export const transformToCSV = (data: Conversation[]) => {
  const header = 'Conversation;ID;Finished at';

  const csv = data.map((conversation) => {
    const { author, id, finishedAt } = conversation;

    if (!finishedAt) return 'ERROR;ERROR;ERROR';

    const date = new Date(finishedAt);
    return `Conversation ${author.name};${id};${format(date, 'dd/MM/yyyy HH:mm:ss')}`;
  });

  return [header, ...csv].join('\n');
};
