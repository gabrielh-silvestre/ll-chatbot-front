import { nanoid } from 'nanoid';

import type {
  Author,
  ChatInputMessage,
  ChatLink,
  ChatOption,
  Conversation,
  LinkMessage,
  Message,
  MessageInput,
  MessageTypes,
  OptionMessage,
} from './types';

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const createNewAuthor = (name: string): Author => ({
  id: nanoid(),
  name,
});

export const createNewConversation = (
  author: Author,
  prevMessages: Message[] = []
): Conversation => ({
  id: nanoid(),
  author,
  messages: prevMessages,
  createdAt: new Date(),
  finishedAt: null,
});

export const createNewMessage = (
  text: string,
  fromBot = false,
  type?: MessageTypes,
  items?: (ChatOption | ChatLink | MessageInput)[]
): Message | OptionMessage | LinkMessage | ChatInputMessage => ({
  id: nanoid(),
  text,
  type,
  fromBot,
  createdAt: new Date(),
  links: type === 'linkList' ? (items as ChatLink[]) : [],
  options: type === 'optionList' ? (items as ChatOption[]) : [],
  inputs: type === 'input' ? (items as MessageInput[]) : [],
});

/*
  O código abaixo foi retirado do seguinte artigo: https://dev.to/thomasfindlay/how-to-download-csv-and-json-files-in-react-18m6
*/
export const downloadFile = async ({
  data,
  fileName,
  type,
}: {
  data: string;
  fileName: string;
  type: string;
}) => {
  const blob = new Blob([data], { type });

  const a = document.createElement('a');
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);

  const clickHandler = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  a.dispatchEvent(clickHandler);
  a.remove();
};
