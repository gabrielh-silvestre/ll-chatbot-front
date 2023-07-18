import { useState } from 'react';

import { useBotStore } from '../../../store/botStore';

import styles from './index.module.css';

export function ChatInput() {
  const { sendMessage } = useBotStore((state) => state);

  const [text, setText] = useState<string>('');

  const handleSend = async () => {
    const normalizedText = text.trim();
    if (normalizedText === '') return;

    sendMessage(normalizedText);

    setText('');
  };

  return (
    <div className={styles.chat_input_container}>
      <input
        id="chatbot-input"
        type="text"
        value={text}
        onChange={({ target }) => setText(target.value)}
        onKeyDown={({ key }) => (key === 'Enter' ? handleSend() : null)}
      />

      <button type="button" onClick={handleSend} disabled={text === ''}>
        Enviar
      </button>
    </div>
  );
}
