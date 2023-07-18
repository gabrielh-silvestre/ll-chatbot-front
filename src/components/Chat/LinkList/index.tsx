import type { ChatLink } from '../../../utils/types';

import { ChatMessage, ChatMessageProps } from '../Message';

import styles from './index.module.css';

type ChatLinkListProps = ChatMessageProps & {
  links: ChatLink[];
};

export function ChatLinkList({ links, ...props }: ChatLinkListProps) {
  return (
    <div className={styles.chat_links_container}>
      <ChatMessage {...props} />

      <ul className={styles.link_list_container}>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
