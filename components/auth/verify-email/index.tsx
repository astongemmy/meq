'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import EmailVerificationUsingLink from './link-verification';
import EmailVerificationUsingCode from './code-verification';
import { useAppSelector } from '@/store/hooks';
import { AuthWrapper, LinkWrapper } from '../auth.styled';

interface VerificationInterface {
  [key: string]: {
    description: string;
    title: string;
    icon: string;
    alt: string;
  };
};

const verificationInterface: VerificationInterface = {
	unknownError: {
		description: 'Unfortunately, we seem to have experienced some kind of trouble signing you up. We’re currently working, and all should be up soon.',
		title: `We’re experiencing some kind of trouble`,
		icon: '/images/icons/verification-error.svg',
		alt: 'verification_error_icon'
	},
	OTPError: {
		description: 'Unfortunately, we seem to have experienced some kind of trouble sending you an OTP. We’re currently working, and all should be up soon.',
		title: `We’re experiencing some kind of trouble`,
		icon: '/images/icons/verification-error.svg',
		alt: 'verification_error_icon'
	},
	verifyEmail: {
		description: 'Please enter the 5-digit code we just sent to jon@abcmail.com',
		icon: '/images/icons/verify-email.svg',
		title: 'Check your inbox',
		alt: 'verify_email_icon'
	},
	expiredLink: {
		description: 'Unfortunately, the link seems to have expired. Please try again',
		icon: '/images/icons/time-ellapsed.svg',
		title: `Expired link`,
		alt: 'expired_link_icon'
	},
	verified: {
		description: 'Congratulations John, your account has been verified',
		title: `Congratulations, you’ve been verified`,
		icon: '/images/icons/congratulations.svg',
		alt: 'congratulations_icon'
	},
	verifyingUsingLink: {
		description: 'Your account is currently being verified, please hold on.',
		icon: '/images/logos/mega-quest-logo-short-blue.svg',
		title: 'Your account is being verified...',
		alt: 'verifying_icon'
	}
};

const EmailVerification = () => {
	const { verificationError, isVerifying, isVerified } = useAppSelector(state => state.auth);

  const searchParams = useSearchParams();
  const isRedirectedFromMailbox = searchParams.get('verifyWithLink');
  const jwtToken = searchParams.get('token');
  const otp = searchParams.get('otp');

	const isLinkVerification = isRedirectedFromMailbox && jwtToken && otp;

	const verificationStatus = {
		unknownError: verificationError.unknownError,
		expiredLink: verificationError.expiredLink,
		verifyingUsingLink: isVerifying.usingLink,
		OTPError: verificationError.OTPError,
		verified: isVerified
	};
	
	const statusKey = Object.entries(verificationStatus).find(([key, value]) => value && key)?.[0] ?? 'verifyEmail';

  return (
		<AuthWrapper vertical>
			<Image
				src={verificationInterface[statusKey].icon}
				alt={verificationInterface[statusKey].alt}
				height={143}
				width={127}
				priority
			/>

      <div>
				<h1>{verificationInterface[statusKey].title}</h1>
				
				<p>
					{verificationInterface[statusKey].description}
				</p>
			</div>
			
			{!isVerified && !isLinkVerification && (
				<EmailVerificationUsingCode />
			)}

			{!isVerified && isLinkVerification && (
				<EmailVerificationUsingLink />
			)}
			
			{isVerified && (
				<LinkWrapper href="/auth">
					Login to Get Started
				</LinkWrapper>
			)}
    </AuthWrapper>
  );
};

export default EmailVerification;