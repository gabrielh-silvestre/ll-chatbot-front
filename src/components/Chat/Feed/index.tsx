import { useBotStore } from '../../../store/botStore';
import { ChatInput } from '../Input';

import { ChatMessage } from '../Message';

import styles from './index.module.css';

export function ChatFeed() {
  const { anonymousMessages, currentConversation } = useBotStore();

  const allMessages = [
    ...anonymousMessages,
    ...(currentConversation?.messages ?? []),
  ];

  return (
    <div className={styles.chat_container}>
      <div className={styles.chat_feed_container}>
        {allMessages.map((m) => (
          <ChatMessage key={m.id} text={m.text} createdAt={m.createdAt} />
        ))}
      </div>

      <ChatInput />
    </div>
  );
}
