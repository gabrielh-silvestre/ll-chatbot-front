import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

import type { IAuthGateway } from '../../gateways/auth/Auth.gateway.interface';

import { useBotStore } from '../../store/botStore';

import styles from './index.module.css';

type SignInFormData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

type SignInFormProps = {
  authGateway: IAuthGateway;
};

export function SignInForm({ authGateway }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignInFormData>({
    mode: 'onSubmit',
    values: { email: '', password: '', confirmPassword: '' },
  });

  const [isRegister, setIsRegister] = useState(false);
  const { startConversation } = useBotStore();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const { email, password } = data;

    if (isRegister) {
      const newAuthor = await authGateway.signUp(email, password);
      startConversation(newAuthor);

      return;
    }

    const author = await authGateway.signIn(email, password);
    startConversation(author);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
      <label htmlFor="register-email" className={styles.form_label}>
        <span>Email</span>

        <input
          id="register-email"
          type="email"
          placeholder="example@example.com"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />

        {errors.email ? <span>Insert a valid email</span> : null}
      </label>

      <label htmlFor="register-password" className={styles.form_label}>
        <span>Password</span>

        <input
          id="register-password"
          type="password"
          placeholder="Min 6 digits"
          {...register('password', { required: true, minLength: 6 })}
        />

        {errors.password ? (
          <span>Insert a valid password: (min 8 digits)</span>
        ) : null}
      </label>

      {isRegister ? (
        <label htmlFor="register-password" className={styles.form_label}>
          <span>Confirm Password</span>

          <input
            id="register-password"
            type="password"
            placeholder="Min 6 digits"
            {...register('confirmPassword', {
              required: true,
              minLength: 6,
              validate: (value) => value === getValues('password'),
            })}
          />

          {errors.password ? <span>The passwords must be the same</span> : null}
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
  );
}
