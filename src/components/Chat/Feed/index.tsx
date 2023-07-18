import type {
  LinkMessage,
  OptionMessage,
  ChatInputMessage,
} from '../../../utils/types';

import { useBotStore } from '../../../store/botStore';

import { ChatInput } from '../Input';
import { ChatMessage } from '../Message';
import { ChatOptionList } from '../OptionList';
import { ChatLinkList } from '../LinkList';
import { ChatMessageInput } from '../MessageInput';

import styles from './index.module.css';

export function ChatFeed() {
  const { anonymousMessages, currentConversation } = useBotStore();

  const allMessages = [
    ...anonymousMessages,
    ...(currentConversation?.messages ?? []),
  ];

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
