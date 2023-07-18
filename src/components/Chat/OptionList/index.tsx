import type { ChatOption } from '../../../utils/types';

import { ChatMessage, ChatMessageProps } from '../Message';

import styles from './index.module.css';

type ChatOptionListProps = ChatMessageProps & {
  options: ChatOption[];
};

export function ChatOptionList({
  text,
  createdAt,
  options,
}: ChatOptionListProps) {
  return (
    <div className={styles.option_container}>
      <ChatMessage text={text} createdAt={createdAt} />

      {options.map((item) => (
        <button
          key={item.label}
          className={styles.option}
          onClick={item.onClick}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
