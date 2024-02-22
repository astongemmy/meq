'use client';

import React, { ChangeEvent, useState, ReactNode, FormEvent, Ref } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import Password from 'antd/es/input/Password';
import { InputWrapper } from './input.styled';
import { Input, InputRef } from 'antd';

interface InputProps {
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'password' | 'email' | 'text' | 'tel';
  onInput?: (e: FormEvent) => void;
  actionText?: ReactNode;
  helpText?: ReactNode;
  placeholder?: string;
  autoFocus?: boolean;
  maxLength?: number;
  hasError?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  size?: SizeType;
  label?: string;
  value?: string;
  name?: string;
  id?: string;
}

const InputField = React.forwardRef((props: InputProps, ref: Ref<InputRef>) => {
  const {
    required = false,
    disabled = false,
    size = 'large',
    type = 'text',
    placeholder,
    actionText,
    maxLength,
    onKeyDown,
    autoFocus,
    className,
    helpText,
    onChange,
    onFocus,
    onPaste,
    onInput,
    hasError,
		label,
    value,
    name,
    id,
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <InputWrapper className={className}>
      {label && (<label htmlFor={id}>{label}</label>)}

      {type === 'password' ? (
        <Password
          status={hasError ? 'error' : ''}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          autoFocus={autoFocus}
          defaultValue={value}
          required={required}
          onChange={onChange}
          disabled={disabled}
          onPaste={onPaste}
          onInput={onInput}
          onFocus={onFocus}
          name={name}
          size={size}
          ref={ref}
          id={id}
          visibilityToggle={{
            onVisibleChange: setShowPassword,
            visible: showPassword
          }}
          iconRender={(visible) =>
            visible ? (
              <EyeInvisibleOutlined style={{ fontSize: '150%' }} />
            ) : (
              <EyeOutlined style={{ fontSize: '150%' }} />
            )
          }
        />
      ) : (
        <Input
          status={hasError ? 'error' : ''}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          autoFocus={autoFocus}
          defaultValue={value}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onPaste={onPaste}
          onInput={onInput}
          onFocus={onFocus}
          name={name}
          size={size}
          ref={ref}
          id={id}
        />
      )}
        
      {helpText && (helpText)}
      {actionText && (actionText)}
    </InputWrapper>
  );
});

InputField.displayName = 'InputField';

export default InputField;
