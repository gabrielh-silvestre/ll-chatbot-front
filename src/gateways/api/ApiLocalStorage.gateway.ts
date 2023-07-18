import type { IApiGateway } from './Api.gateway.interface';
import type { Conversation, Message } from '../../utils/types';

export class ApiLocalStorageGateway implements IApiGateway {
  private readonly storageKey = 'conversations:api';

  private getStorage<T = any>(): T | null {
    const value = localStorage.getItem(this.storageKey);
    return value ? (JSON.parse(value) as T) : null;
  }

  private setStorage(value: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  async getLastConversation(authorId: string): Promise<Conversation | null> {
    const conversations = this.getStorage<Conversation[]>();

    if (!conversations) return null;

    const lastConversation = conversations.filter(
      (conversation) => conversation.author.id === authorId
    );

    if (lastConversation.length === 0) return null;

    return lastConversation[lastConversation.length - 1];
  }

  async getConversations(authorId: string): Promise<Conversation[]> {
    const conversations = this.getStorage<Conversation[]>();

    if (!conversations) return [];

    return conversations.filter(
      (conversation) => conversation.author.id === authorId
    );
  }

  async saveConversation(conversation: Conversation): Promise<Conversation> {
    const conversations = this.getStorage<Conversation[]>();

    if (conversations) {
      this.setStorage([...conversations, conversation]);
    } else {
      this.setStorage([conversation]);
    }

    return conversation;
  }

  async sendMessage(conversationId: string, message: Message): Promise<void> {
    const conversations = this.getStorage<Conversation[]>();
    if (!conversations) return;

    const conversationIndex = conversations.findIndex(
      (c) => c.id === conversationId
    );
    if (conversationIndex === -1) return;

    const foundConversation = conversations[conversationIndex];

    this.setStorage([
      ...conversations.slice(0, conversationIndex),
      {
        ...foundConversation,
        messages: [...foundConversation.messages, message],
      },
      ...conversations.slice(conversationIndex + 1),
    ]);
  }
}
