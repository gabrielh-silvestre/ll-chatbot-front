import { SubmitHandler, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';

import { ChatMessage, ChatMessageProps } from '../Message';

import styles from './index.module.css';

type ChatAuthFormFormData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

type ChatAuthFormProps = ChatMessageProps & {
  signIn: (form: ChatAuthFormFormData) => Promise<void>;
  signUp: (form: ChatAuthFormFormData) => Promise<void>;
};

export function ChatAuthForm({ signIn, signUp, ...props }: ChatAuthFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ChatAuthFormFormData>({
    mode: 'onSubmit',
    values: { email: '', password: '', confirmPassword: '' },
  });

  const [isRegister, setIsRegister] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 1, [errors]);

  const submit: SubmitHandler<ChatAuthFormFormData> = async (form) => {
    if (isRegister) {
      await signUp(form);
      return;
    }

    await signIn(form);
  };

  return (
    <div className={styles.message_input_container}>
      <ChatMessage {...props} />

      <form onSubmit={handleSubmit(submit)} className={styles.form_container}>
        <label
          htmlFor="chat-access-login"
          className={styles.form_label}
          style={{ borderColor: hasErrors ? 'red' : 'inherit' }}
        >
          <p>Email</p>

          <input
            id="chat-access-login"
            type="email"
            placeholder="example@example.com"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
        </label>

        <label
          htmlFor="chat-access-pass"
          className={styles.form_label}
          style={{ borderColor: hasErrors ? 'red' : 'inherit' }}
        >
          <p>Password</p>

          <input
            id="chat-access-pass"
            type="password"
            placeholder="Min 6 digits"
            {...register('password', { required: true, minLength: 6 })}
          />
        </label>

        {isRegister ? (
          <label htmlFor="register-password" className={styles.form_label}>
            <span>Confirm Password</span>

            <input
              id="register-password"
              type="password"
              placeholder="Min 6 digits"
              style={{ borderColor: hasErrors ? 'red' : 'inherit' }}
              {...register('confirmPassword', {
                required: true,
                minLength: 6,
                validate: (value) => value === getValues('password'),
              })}
            />
          </label>
        ) : null}

        <button className={styles.submit_button} type="submit">
          {isRegister ? 'Register' : 'Sign In'}
        </button>

        <button
          className={styles.submit_button}
          type="button"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Already have an account?' : "Doens't have an account?"}
        </button>
      </form>
    </div>
  );
}
