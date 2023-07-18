import styles from './index.module.css';

export type ChatMessageProps = {
  text: string;
  createdAt: Date;
};

export function ChatMessage({ text, createdAt }: ChatMessageProps) {
  return (
    <div className={styles.chat_message_container}>
      <p className={styles.chat_message}>
        <span>{text}</span>

        <span className={styles.chat_message_timestamp}>
          {createdAt.toLocaleTimeString()}
        </span>
      </p>
    </div>
  );
}
