import { useEffect, useMemo, useState } from 'react';

import type {
  LinkMessage,
  OptionMessage,
  ChatInputMessage,
} from '../../../utils/types';

import { useBotStore } from '../../../store/botStore';
import { botActionProvider } from './index.service';

import { ChatInput } from '../Input';
import { ChatMessage } from '../Message';
import { ChatOptionList } from '../OptionList';
import { ChatLinkList } from '../LinkList';
import { ChatMessageInput } from '../MessageInput';

import styles from './index.module.css';

export function ChatFeed() {
  const { anonymousMessages, currentConversation, sendBotMessage } =
    useBotStore();

  const allMessages = useMemo(
    () => [...anonymousMessages, ...(currentConversation?.messages ?? [])],
    [anonymousMessages, currentConversation?.messages]
  );

  const [lastMessage, setLastMessage] = useState(
    allMessages[allMessages.length - 1] ?? null
  );

  useEffect(() => {
    const botWatch = () => {
      if (!lastMessage) return;

      botActionProvider(lastMessage, sendBotMessage);
    };

    botWatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  useEffect(() => {
    setLastMessage(allMessages[allMessages.length - 1] ?? null);
  }, [allMessages]);

  const markupMessages = allMessages.map((m) => {
    switch (m.type) {
      case 'optionList':
        return <ChatOptionList key={m.id} {...(m as OptionMessage)} />;
      case 'linkList':
        return <ChatLinkList key={m.id} {...(m as LinkMessage)} />;
      case 'input':
        return (
          <ChatMessageInput
            key={m.id}
            {...(m as ChatInputMessage)}
            onSubmit={console.log}
          />
        );
      default:
        return <ChatMessage key={m.id} {...m} />;
    }
  });

  return (
    <div className={styles.chat_container}>
      <div className={styles.chat_feed_container}>{markupMessages}</div>

      <ChatInput />
    </div>
  );
}
