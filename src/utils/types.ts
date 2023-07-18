export interface Message {
  id: string;
  text: string;

  createdAt: Date;
}

export interface Author {
  id: string;
  name: string;
}

export interface Conversation {
  id: string;

  author: Author;
  messages: Message[];
}

export interface BotStore {
  anonymousMessages: Message[];

  conversations: Conversation[];
  currentConversation: Conversation | null;

  startConversation: (author: Author) => void;
  sendMessage: (message: string) => void;
}
