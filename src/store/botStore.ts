import { create } from 'zustand';

import type { BotStore, Message } from '../utils/types';

export const useBotStore = create<BotStore>((set) => ({
  anonymousMessages: [],

  conversations: [],
  currentConversation: null,

  startConversation: (author) =>
    set((state) => {
      const newConversation = {
        id: `${Math.floor(Math.random() * 5000)}`,
        author,
        messages: state.anonymousMessages,
      };

      return {
        ...state,
        conversations: [...state.conversations, newConversation],
        currentConversation: newConversation,
        anonymousMessages: [],
      };
    }),

  sendMessage: (message) =>
    set((state) => {
      const newMessage: Message = {
        id: `${Math.floor(Math.random() * 5000)}`,
        text: message,
        createdAt: new Date(),
      };

      /* No conversation === Anonymous author */
      if (!state.currentConversation) {
        return {
          ...state,
          anonymousMessages: [...state.anonymousMessages, newMessage],
        };
      }

      return {
        ...state,
        currentConversation: {
          ...state.currentConversation,
          messages: [...state.currentConversation.messages, newMessage],
        },
      };
    }),
}));
