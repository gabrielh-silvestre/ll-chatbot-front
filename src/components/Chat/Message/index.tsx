import type { Message } from '../../../utils/types';

import styles from './index.module.css';

export type ChatMessageProps = Omit<Message, 'id' | 'type'>;

export function ChatMessage({ text, fromBot, createdAt }: ChatMessageProps) {
  return (
    <div
      className={styles.chat_message_container}
      style={{ alignItems: fromBot ? 'flex-start' : 'flex-end' }}
    >
      <p className={styles.chat_message}>
        <span>{text}</span>

        <span
          className={styles.chat_message_timestamp}
          style={{
            right: fromBot ? 'auto' : '5px',
            left: fromBot ? '5px' : 'auto',
          }}
        >
          {createdAt.toLocaleTimeString()}
        </span>
      </p>
    </div>
  );
}
