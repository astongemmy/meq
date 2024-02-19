'use client';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsVerified, setIsVerifying, updateVerificationError } from '../reducer';
import { AuthFormWrapper } from '../forms/form.styled';

interface Credentials {
  confirmationCode: Array<string>;
  resendCode: boolean;
  email: string;
}

const codeDigits = 6;

const EmailVerificationUsingCode = () => {
	const { verificationError, isVerifying, isVerified } = useAppSelector(state => state.auth);
	const [credentials, setCredentials] = useState<Credentials>({
    confirmationCode: new Array(codeDigits).fill(''),
    resendCode: false,
    email: '',
  });

	const isCodeProvided = credentials.confirmationCode.filter((item) => item).length === codeDigits;
	const hasCodeVerificationError = verificationError.expiredCode || verificationError.invalidCode;
	const otpInputRefs = Array.from({ length: codeDigits }, () => useRef<HTMLInputElement>(null));
  const dispatch = useAppDispatch();
  
  const verifyEmail = (e: React.MouseEvent) => {
    dispatch(setIsVerifying({ usingCode: true }));

    setTimeout(() => {
      dispatch(updateVerificationError({ invalidCode: true }));
      dispatch(setIsVerifying({ usingCode: false }));
    //   dispatch(setIsVerified(true));
    }, 3000);

		e.preventDefault();
  };

	const handleInvalidOTPInput = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		const keyCode = e.which ?? e.keyCode;
		const key = e.key || String.fromCharCode(keyCode);
		if ((key !== 'Backspace' && (isNaN(Number(key)) || key === ' ')) && !e.metaKey && !e.ctrlKey && !e.altKey) {
			e.preventDefault();
		}
	};

	const handleInvalidOTPOnPaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
		const clipboardData = e.clipboardData || window.Clipboard;
		const pastedText = clipboardData.getData('text');
		if (/[^\d]/.test(pastedText)) e.preventDefault();
	};
	
	const handleOTPInput = (e: React.FormEvent, inputIndex: number) => {
		const target = e.target as HTMLInputElement;
		const value = target.value;

		const newConfirmationCode = credentials.confirmationCode.map((code, codeIndex) => {
			if (codeIndex === inputIndex) return value.replace(/[^0-9]/g, '');
			return code;
		});

		setCredentials({ ...credentials, confirmationCode: newConfirmationCode });

		if (value.length >= 1 && inputIndex < otpInputRefs.length - 1) {
			otpInputRefs[inputIndex + 1].current?.focus();
		} else if (value.length === 0 && inputIndex > 0) {
			otpInputRefs[inputIndex - 1].current?.focus();
		}
	};
	
  return (
		<AuthFormWrapper>
			<div className="input-wrapper verify-email">
				{otpInputRefs.map((otpInputRef, index) => (
					<input
						className={hasCodeVerificationError ? 'error' : ''}
						defaultValue={credentials.confirmationCode[index]}
						onInput={(e) => handleOTPInput(e, index)}
						onFocus={(e) => e.target.select()}
						onPaste={handleInvalidOTPOnPaste}
						onKeyDown={handleInvalidOTPInput}
						autoFocus={index === 0}
						ref={otpInputRef}
						placeholder="-"
						maxLength={1}
						key={index}
						type="tel"
					/>
				))}
			</div>

			{hasCodeVerificationError && (
				<div className="otp-error">
					<ExclamationCircleFilled />
					{verificationError.invalidCode ? 'Invalid' : 'Expired'} code entered
				</div>
			)}

			<div>
				<button type="button" className="request-code">
					<Image
						src="/images/icons/timer.svg"
						alt="timer_icon"
						height={29}
						width={29}
					/>
					Request a new code in 5:00
				</button>

				<Button
					disabled={!isCodeProvided || isVerifying.usingCode}
					className={hasCodeVerificationError ? 'error' : ''}
					loading={isVerifying.usingCode}
					onClick={verifyEmail}
					htmlType="submit"
					type="primary"
					size="large"
				>
					{hasCodeVerificationError ? 'Request New OTP' : 'Confirm Email'}
				</Button>
			</div>
		</AuthFormWrapper>
  );
};

export default EmailVerificationUsingCode;