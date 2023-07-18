import { create } from 'zustand';

import type { BotStore, Message } from '../utils/types';

import { createNewConversation, createNewMessage } from '../utils/helpers';

export const useBotStore = create<BotStore>((set) => ({
  anonymousMessages: [],

  conversations: [],
  currentConversation: null,

  startConversation: (author) =>
    set((state) => {
      const newConversation = createNewConversation(
        author,
        state.anonymousMessages
      );

      return {
        ...state,
        conversations: [...state.conversations, newConversation],
        currentConversation: newConversation,
        anonymousMessages: [],
      };
    }),

  sendMessage: (text, type, props) =>
    set((state) => {
      const newMessage: Message = createNewMessage(
        text,
        false,
        type,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        props as any
      );

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

  sendBotMessage: (text, type, props) =>
    set((state) => {
      const newMessage = createNewMessage(text, true, type, props);

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
