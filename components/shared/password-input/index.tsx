'use client';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface PasswordInputProps {
  handleChange?: (e: React.FormEvent) => any;
  placeholder?: string;
  hasError?: boolean;
  label?: string;
  value?: string;
  name?: string;
  id?: string;
}

const PasswordInput = (props: PasswordInputProps) => {
  const {
		label = 'Password',
    id = 'password',
    handleChange,
    placeholder,
    hasError,
    value,
    name,
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = (): void => setShowPassword(!showPassword);

  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>

      <div className="password-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          className={hasError ? 'error' : ''}
          placeholder={placeholder}
          onChange={handleChange}
          defaultValue={value}
          name={name}
          id={id}
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
  );
};

export default PasswordInput;
