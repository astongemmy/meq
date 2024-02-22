'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { ChangeEvent, useState } from 'react';
import { Button } from 'antd';
import Link from 'next/link';

import { SignInCredentials, SignInValidationError } from '../types';
import { updateModal } from '@/components/shared/modals/reducer';
import InputField from '@/components/shared/inputs';
import { AuthFormWrapper } from './form.styled';
import { useAppDispatch } from '@/store/hooks';
import { isValidEmail } from '../utils';

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [validationError, setValidationError] = useState<SignInValidationError>({
    wrongPassword: false,
    invalidEmail: false
  });

  const [credentials, setCredentials] = useState<SignInCredentials>({
    password: '',
    email: '',
  });

  const { data: session } = useSession();

  const handleCredentialChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [name]: value });

    if (value) {
      if (name === 'email') {
        setValidationError((prev) => ({
          ...prev,
          invalidEmail: !isValidEmail(value)
        }));
      }
    } else {
      // Reset validation indicators for UI updates
      setValidationError((prev) => ({
        ...prev,
        invalidEmail: name === 'email' ? false : validationError.invalidEmail
      }));
    }
  };

  const openPasswordResetModal = () => dispatch(updateModal({
    target: 'resetPassword',
    payload: {
      isLoading: false,
      response: null,
      open: true
    }
  }));

  console.log(session);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    signIn('credentials', {
      password: credentials.password,
      email: credentials.email,
      redirect: false
    })
    .catch((error) => {
      console.log(error);
    });

    // setTimeout(() => {
    //   setValidationError((prev) => ({
    //     ...prev,
    //     wrongPassword: true
    //   }));
    //   setIsLoading(false);
    // }, 2000);
  };

  const disableSignInButton = (
    !Object.values(credentials).every((entry) => entry) ||
    isLoading
  );

  return (
    <AuthFormWrapper onSubmit={handleSignIn}>
      <InputField
        hasError={validationError.invalidEmail}
        onChange={handleCredentialChange}
        value={credentials.email}
        placeholder="Enter Email"
        label="Email"
        size="large"
        name="email"
        type="email"
        id="email"
        required
      />

      <InputField
        hasError={validationError.wrongPassword}
        onChange={handleCredentialChange}
        value={credentials.password}
        placeholder="Enter Password"
        label="Password"
        type="password"
        name="password"
        id="password"
        size="large"
        actionText={
          <div className="forgot-password">
            <button
              disabled={!validationError.wrongPassword}
              onClick={openPasswordResetModal}
              type="button"
            >
              Forgot password
            </button>
          </div>
        }
        helpText={
          validationError.wrongPassword && (
            <div className="password-error">
              <ExclamationCircleFilled />
              Incorrect Password. Please try again
            </div>
          )
        }
      />

      <Button
        disabled={disableSignInButton}
        loading={isLoading}
        htmlType="submit"
        type="primary"
        size="large"
      >
        {!isLoading && "Login"}
      </Button>

      <Button
        onClick={() => signOut()}
        htmlType="button"
        type="primary"
        size="large"
      >
        Logout
      </Button>

      <p className="create-account">
        Don’t have an account? <Link href="/auth/sign-up">Sign up</Link>
      </p>
    </AuthFormWrapper>
  );
};

export default SignInForm;