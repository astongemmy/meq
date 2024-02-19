'use client';

import { ExclamationCircleFilled, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { ChangeEvent, useState } from 'react';
import { Button, Input } from 'antd';
import Link from 'next/link';

import { updateModal } from '@/components/shared/modals/reducer';
import { Credentials, ValidationError } from '@/types/sign-up';
import { AuthFormWrapper } from './form.styled';
import { useAppDispatch } from '@/store/hooks';
import { isValidEmail } from '../utils';
import Password from 'antd/es/input/Password';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [validationError, setValidationError] = useState<ValidationError>({
    wrongPassword: false,
    invalidEmail: false
  });

  const [credentials, setCredentials] = useState<Credentials>({
    password: "",
    email: "",
  });

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

  const togglePassword = (): void => setShowPassword(!showPassword);

  const handleSignIn = (e: React.FormEvent) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    e.preventDefault();
  };

  const disableSignInButton = (
    Object.values(validationError).some((entry) => entry) ||
    !Object.values(credentials).every((entry) => entry) ||
    isLoading
  );

  return (
    <AuthFormWrapper onSubmit={handleSignIn}>
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>

        <input
          className={validationError.invalidEmail ? 'error' : ''}
          onChange={handleCredentialChange}
          defaultValue={credentials.email}
          placeholder="Enter Email"
          name="email"
          type="email"
          id="email"
        />
      </div>

      <div className="input-wrappe">
        <label htmlFor="password">Password</label>

        <Password
          visibilityToggle={{ visible: showPassword, onVisibleChange: setShowPassword }}
          className={validationError.wrongPassword ? 'error' : ''}
          defaultValue={credentials.password}
          onChange={handleCredentialChange}
          placeholder="Enter Password"
          name="password"
          id="password"
          iconRender={(visible) => (visible ? <EyeInvisibleOutlined height="2rem" width="2rem" /> : <EyeOutlined height="2rem" width="2rem" />)}
          size="large"
        />
        
        {validationError.wrongPassword && (
          <div className="password-error">
            <ExclamationCircleFilled />
            Incorrect Password. Please try again
          </div>
        )}

        <div className="forgot-password">
          <button
            disabled={!validationError.wrongPassword}
            onClick={openPasswordResetModal}
            type="button"
          >
            Forgot password
          </button>
        </div>
      </div>

      <div>
        <Button
          disabled={disableSignInButton}
          loading={isLoading}
					htmlType="submit"
          type="primary"
					size="large"
        >
					{!isLoading && 'Login'}
				</Button>
      </div>

      <div className="create-account">
        Don’t have an account? <Link href="/auth/sign-up">Sign up</Link>
      </div>
    </AuthFormWrapper>
  );
};

export default SignInForm;