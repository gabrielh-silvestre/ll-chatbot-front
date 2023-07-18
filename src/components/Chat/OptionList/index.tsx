import type { ChatOption } from '../../../utils/types';

import { ChatMessage, ChatMessageProps } from '../Message';

import styles from './index.module.css';

type ChatOptionListProps = ChatMessageProps & {
  options: ChatOption[];
};

export function ChatOptionList({ options, ...props }: ChatOptionListProps) {
  return (
    <div className={styles.option_container}>
      <ChatMessage {...props} />

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
