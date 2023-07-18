import { useEffect, useMemo, useState } from 'react';

import type { IApiGateway } from '../../../gateways/api/Api.gateway.interface';
import type { IAuthGateway } from '../../../gateways/auth/Auth.gateway.interface';
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

import { sleep } from '../../../utils/helpers';

import styles from './index.module.css';

type ChatFeedProps = {
  authGateway: IAuthGateway;
  apiGateway: IApiGateway;
};

export function ChatFeed({ authGateway, apiGateway }: ChatFeedProps) {
  const botStore = useBotStore();
  const {
    anonymousMessages,
    currentConversation,
    sendBotMessage,
    startConversation,
    endConversation,
  } = botStore;

  const allMessages = useMemo(
    () => [...anonymousMessages, ...(currentConversation?.messages ?? [])],
    [anonymousMessages, currentConversation?.messages]
  );

  const [lastMessage, setLastMessage] = useState(
    allMessages[allMessages.length - 1] ?? null
  );

  const finish = async () => {
    await apiGateway.saveConversation(currentConversation!); // only execute on "end" action

    endConversation();
  };

  useEffect(() => {
    const botWatch = async () => {
      if (!lastMessage) return;

      await sleep(1000); // 1s delay to add a more natural feel to the bot
      await botActionProvider(lastMessage, botStore, finish);
    };

    void botWatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  useEffect(() => {
    setLastMessage(allMessages[allMessages.length - 1] ?? null);
  }, [allMessages]);

  const handleSubmit = async () => {
    const newAuthor = await authGateway.signUp('test@test.com', 'test');

    startConversation(newAuthor);

    sendBotMessage('Thanks for signing up!');
    sendBotMessage('Now we can continue, feel free to ask me about "loans"');
  };

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
            onSubmit={handleSubmit}
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
