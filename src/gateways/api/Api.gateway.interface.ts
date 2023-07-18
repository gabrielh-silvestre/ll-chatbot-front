import type { Conversation, Message } from '../../utils/types';

export interface IApiGateway {
  getLastConversation: (authorId: string) => Promise<Conversation | null>;
  getConversations: (authorId: string) => Promise<Conversation[]>;

  saveConversation: (conversation: Conversation) => Promise<Conversation>;

  sendMessage: (conversationId: string, message: Message) => Promise<void>;
}
