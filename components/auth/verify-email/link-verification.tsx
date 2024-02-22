'use client';

import { useEffect } from 'react';

import { setIsVerified, setIsVerifying, updateVerificationError } from '../reducer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LinkWrapper } from '../auth.styled';

const EmailVerificationUsingLink = () => {
	const { verificationError } = useAppSelector(state => state.auth);

	const getVerificationErrorInterface = () => {
    if (verificationError.unknownError) {
			return {
				href: '/auth/verify-email',
				text: 'Try again'
			};
		}
    
		if (verificationError.expiredLink) {
			return {
				href: '/auth/verify-email',
				text: 'Request new link'
			};
		}
  };

	const verificationErrorInterface = getVerificationErrorInterface();

  const dispatch = useAppDispatch();
  
  const verifyEmail = () => {
    dispatch(setIsVerifying({ usingLink: true }));

    setTimeout(() => {
			dispatch(updateVerificationError({
				expiredLink: true
			}));
			
      dispatch(setIsVerifying({ usingLink: false }));
      // dispatch(setIsVerified(true));
    }, 3000);
  };

	useEffect(() => {
		verifyEmail();
	}, []);

	if (!verificationErrorInterface) return null;

	return (
		<LinkWrapper href={verificationErrorInterface.href} className="verification-failed">
			{verificationErrorInterface.text}
		</LinkWrapper>
	);
};

export default EmailVerificationUsingLink;
