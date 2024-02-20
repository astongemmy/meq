'use client';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Flex, InputRef } from 'antd';
import { useRef, useState } from 'react';
import Image from 'next/image';

import { setIsVerified, setIsVerifying, updateVerificationError } from '../reducer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { EmailVerificationCredentials } from '../types';
import useCountdownTimer from '@/hooks/countdown-timer';
import { AuthFormWrapper } from '../forms/form.styled';
import InputField from '@/components/shared/inputs';

const codeDigits = 5;

const EmailVerificationUsingCode = () => {
	const { verificationError, isVerifying, isVerified } = useAppSelector(state => state.auth);
	const [credentials, setCredentials] = useState<EmailVerificationCredentials>({
    confirmationCode: new Array(codeDigits).fill(''),
    resendCode: false,
    email: '',
  });

	const isCodeProvided = credentials.confirmationCode.filter((item) => item).length === codeDigits;
	const isVerificationError = verificationError.expiredCode || verificationError.invalidCode;
	const otpInputRefs = Array.from({ length: codeDigits }, () => useRef<InputRef>(null));
	const { restartTimer, timeLeft, timeUp } = useCountdownTimer(0.5);
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
		console.log(otpInputRefs);
		
		if (value.length >= 1 && inputIndex < otpInputRefs.length - 1) {
			otpInputRefs[inputIndex + 1].current?.focus();
		} else if (value.length === 0 && inputIndex > 0) {
			otpInputRefs[inputIndex - 1].current?.focus();
		}
	};

	const handleOTPRequest = () => {
		restartTimer();
	};
	
	return (
		<AuthFormWrapper>
			<Flex className="otp-wrapper" justify="space-between">
				{otpInputRefs.map((otpInputRef, index) => (
					<InputField
						value={credentials.confirmationCode[index]}
						onInput={(e) => handleOTPInput(e, index)}
						onFocus={(e) => e.target.select()}
						onPaste={handleInvalidOTPOnPaste}
						onKeyDown={handleInvalidOTPInput}
						hasError={isVerificationError}
						autoFocus={index === 0}
						ref={otpInputRef}
						className="otp"
						placeholder="-"
						maxLength={1}
						key={index}
						type="tel"
						required
					/>
				))}
			</Flex>

			{isVerificationError && (
				<div className="otp-error">
					<ExclamationCircleFilled />
					{verificationError.invalidCode ? 'Invalid' : 'Expired'} code entered
				</div>
			)}

			<div>
				<button
					onClick={handleOTPRequest}
					className="request-code"
					disabled={!timeUp}
					type="button"
				>
					<Image
						src="/images/icons/timer.svg"
						alt="timer_icon"
						height={29}
						width={29}
					/>
					Request a new code {!timeUp && `in ${timeLeft}`}
				</button>
			</div>

			<Button
				disabled={!isCodeProvided || isVerifying.usingCode}
				className={isVerificationError ? 'error' : ''}
				loading={isVerifying.usingCode}
				onClick={verifyEmail}
				htmlType="submit"
				type="primary"
				size="large"
			>
				{isVerificationError ? 'Request New OTP' : 'Confirm Email'}
			</Button>
		</AuthFormWrapper>
  );
};

export default EmailVerificationUsingCode;