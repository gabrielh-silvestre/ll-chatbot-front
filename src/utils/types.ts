export type MessageTypes = 'optionList' | 'linkList' | 'input';

export interface Message {
  id: string;
  text: string;

  fromBot: boolean;
  type?: MessageTypes;

  createdAt: Date;
}

export interface ChatOption {
  label: string;
  onClick: () => void;
}

export interface OptionMessage extends Message {
  options: ChatOption[];
}

export interface ChatLink {
  label: string;
  href: string;
}

export interface LinkMessage extends Message {
  links: ChatLink[];
}

export interface MessageInput {
  label: string;
  type: string;
}

export interface ChatInputMessage extends Message {
  inputs: MessageInput[];
}

export interface Author {
  id: string;
  name: string;
}

export interface Conversation {
  id: string;

  author: Author;
  messages: (Message | OptionMessage | LinkMessage)[];
}

export interface BotStore {
  anonymousMessages: (Message | OptionMessage | LinkMessage)[];

  conversations: Conversation[];
  currentConversation: Conversation | null;

  currentAuthor: Author | null;

  startConversation: (author: Author) => void;
  sendMessage: (
    message: string,
    type?: MessageTypes,
    props?: (ChatOption | ChatLink | MessageInput)[]
  ) => void;
  sendBotMessage: (
    message: string,
    type?: MessageTypes,
    props?: (ChatOption | ChatLink | MessageInput)[]
  ) => void;

  endConversation: () => void;
}

export interface MessageRender {
  [key: string]: JSX.Element;
}
