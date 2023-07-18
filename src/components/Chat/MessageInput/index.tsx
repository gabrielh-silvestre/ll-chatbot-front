import { FormEvent, useState } from 'react';

import type { MessageInput } from '../../../utils/types';

import { ChatMessage, ChatMessageProps } from '../Message';

import styles from './index.module.css';

type ChatMessageInputProps = ChatMessageProps & {
  inputs: MessageInput[];
  onSubmit: (inputs: MessageInput[]) => void;
};

export function ChatMessageInput({
  inputs,
  onSubmit,
  ...props
}: ChatMessageInputProps) {
  const [newInputs, setNewInputs] = useState(() =>
    [...inputs].map((input) => ({
      ...input,
      value: '',
    }))
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedInputs = newInputs.map((input) => ({
      ...input,
      value: input.value.trim(),
    }));

    onSubmit(normalizedInputs);
  };

  const handleChange = (index: number, value: string) => {
    const copyInputs = [...newInputs];
    copyInputs[index].value = value;

    setNewInputs(copyInputs);
  };

  return (
    <div className={styles.message_input_container}>
      <ChatMessage {...props} />

      <form onSubmit={handleSubmit} className={styles.form_container}>
        {newInputs.map((input, i) => (
          <label key={input.label}>
            {input.label}

            <input
              type={input.type}
              value={input.value}
              onChange={({ target }) => handleChange(i, target.value)}
            />
          </label>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
