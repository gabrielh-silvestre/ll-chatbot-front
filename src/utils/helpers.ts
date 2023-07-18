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
