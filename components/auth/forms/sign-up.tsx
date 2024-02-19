'use client';

import { Space, Checkbox, CheckboxProps, Button } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import {
  ExclamationCircleFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';

import { passwordRequirements, isPasswordAcceptable, doesPasswordsMatch, isValidEmail } from '../utils';
import { Credentials, ValidationError } from '@/types/sign-up';
import { AuthFormWrapper } from './form.styled';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [validationError, setValidationError] = useState<ValidationError>({
    unacceptablePassword: false,
    differentPasswords: false,
    invalidEmail: false,
  });

  const [credentials, setCredentials] = useState<Credentials>({
    confirmPassword: "",
    acceptTerms: false,
    fullName: "",
    password: "",
    email: "",
  });

  const handleCredentialChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [name]: value });
    
    if (value) {
      if (name === 'confirmPassword') {
        setValidationError((prev) => ({
          ...prev,
          differentPasswords: doesPasswordsMatch(value, credentials.password, validationError.differentPasswords)
        }));
      }

      if (name === 'password') {
        setValidationError((prev) => ({
          ...prev,
          differentPasswords: doesPasswordsMatch(value, credentials.confirmPassword, validationError.differentPasswords),
          unacceptablePassword: !isPasswordAcceptable(value),
        }));
      }

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
        differentPasswords: name === 'confirmPassword' ? false : validationError.differentPasswords,
        invalidEmail: name === 'email' ? false : validationError.invalidEmail
      }));
    }
  };

  const togglePassword = (): void => setShowPassword(!showPassword);

  const handleAcceptTerms: CheckboxProps['onChange'] = (e) => {
    setCredentials({
      ...credentials,
      acceptTerms: e.target.checked,
    });
  };

  const disabledSignUpButton = (
    !Object.values(credentials).every((entry) => entry) ||
    Object.values(validationError).some((entry) => entry) ||
    isLoading 
  );

  const handleSignUp = (e: React.FormEvent) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    e.preventDefault();
  };

  return (
    <AuthFormWrapper onSubmit={handleSignUp}>
      <div className="input-wrapper">
        <label htmlFor="full-name">Full Name</label>

        <input
          defaultValue={credentials.fullName}
          onChange={handleCredentialChange}
          placeholder="John Doe"
          name="fullName"
          id="full-name"
          type="text"
          required
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="email">Email</label>

        <input
          className={validationError.invalidEmail ? 'error' : ''}
          placeholder="example@abcmail.com"
          onChange={handleCredentialChange}
          defaultValue={credentials.email}
          name="email"
          type="email"
          id="email"
          required
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Password</label>

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            defaultValue={credentials.password}
            onChange={handleCredentialChange}
            placeholder="Enter Password"
            name="password"
            id="password"
            required
          />

          <button
            className="toggle-password"
            onClick={togglePassword}
            type="button"
          >
            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </button>
        </div>
      </div>

      <div className="input-wrapper">
        <label htmlFor="confirm-password">Confirm Password</label>

        <div className="password-wrapper">
          <input
            className={validationError.differentPasswords ? 'error' : ''}
            defaultValue={credentials.confirmPassword}
            type={showPassword ? 'text' : 'password'}
            onChange={handleCredentialChange}
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirm-password"
            required
          />

          <button
            className="toggle-password"
            onClick={togglePassword}
            type="button"
          >
            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </button>
        </div>

        {validationError.differentPasswords && (
          <div className="password-error">
            <ExclamationCircleFilled />
            Password doesn’t match
          </div>
        )}
      </div>

      {validationError.unacceptablePassword && (
        <div className="password-requirements">
          <h3>Password Requirements</h3>

          <ul>
            {passwordRequirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </div>
      )}

      <Space align="start" className="accept-terms">
        <Checkbox onChange={handleAcceptTerms} required />
        <p>
          Yes, I understand and agree to the{" "}
          <Link href="/terms-of-service">MegaQuest Terms of Service</Link> ,
          including the <Link href="/user-agreements">User Agreement</Link> and{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </Space>

      <div>
        <Button
          disabled={disabledSignUpButton}
          loading={isLoading}
					htmlType="submit"
          type="primary"
					size="large"
        >
					{!isLoading && 'Sign Up'}
				</Button>
      </div>

      <div className="create-account">
        Already have an account? <Link href="/auth">Sign in</Link>
      </div>
    </AuthFormWrapper>
  );
};

export default SignUpForm;
