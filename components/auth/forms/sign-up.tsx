'use client';

import { Space, Checkbox, CheckboxProps, Button } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';

import { passwordRequirements, isPasswordAcceptable, doesPasswordsMatch, isValidEmail } from '../utils';
import { SignUpCredentials, SignUpValidationError } from '../types';
import InputField from '@/components/shared/inputs';
import { AuthFormWrapper } from './form.styled';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [validationError, setValidationError] = useState<SignUpValidationError>({
    unacceptablePassword: false,
    differentPasswords: false,
    invalidEmail: false,
  });

  const [credentials, setCredentials] = useState<SignUpCredentials>({
    confirmPassword: '',
    acceptTerms: false,
    fullName: '',
    password: '',
    email: '',
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
      <InputField
        onChange={handleCredentialChange}
        value={credentials.fullName}
        placeholder="John Doe"
        label="Full Name"
        name="fullName"
        id="fullName"
        size="large"
        type="text"
        required
      />
      
      <InputField
        hasError={validationError.invalidEmail}
        placeholder="example@abcmail.com"
        onChange={handleCredentialChange}
        value={credentials.email}
        label="Email"
        size="large"
        name="email"
        type="email"
        id="email"
        required
      />
      
      <InputField
        hasError={validationError.unacceptablePassword}
        onChange={handleCredentialChange}
        value={credentials.password}
        placeholder="Enter Password"
        label="Password"
        name="password"
        type="password"
        id="password"
        size="large"
        required
      />

      <InputField
        hasError={validationError.differentPasswords}
        value={credentials.confirmPassword}
        onChange={handleCredentialChange}
        placeholder="Confirm Password"
        label="Confirm Password"
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        size="large"
        required
        helpText={
          validationError.differentPasswords && (
            <div className="password-error">
              <ExclamationCircleFilled />
              Password doesn’t match
            </div>
          )
        }
      />

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

      <Button
        disabled={disabledSignUpButton}
        loading={isLoading}
        htmlType="submit"
        type="primary"
        size="large"
      >
        {!isLoading && 'Sign Up'}
      </Button>

      <p className="create-account">
        Already have an account? <Link href="/auth">Sign in</Link>
      </p>
    </AuthFormWrapper>
  );
};

export default SignUpForm;
