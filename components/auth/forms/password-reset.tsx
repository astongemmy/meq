'use client';

import { ChangeEvent, useState } from 'react';
import { Button } from 'antd';

import { updateModal } from '@/components/shared/modals/reducer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PasswordResetValidationError } from '../types';
import InputField from '@/components/shared/inputs';
import { AuthFormWrapper } from './form.styled';

const PasswordResetForm = () => {
	const dispatch = useAppDispatch();
  
	const [validationError, setValidationError] = useState<PasswordResetValidationError>({
    emailNotFound: true,
  });

	const {
		resetPassword: {
			isLoading,
			response
		}
	} = useAppSelector(state => state.modal);

  const [allowEmailEdit, setAllowEmailEdit] = useState<boolean>(true);
	const editEmail = () => setAllowEmailEdit(true);
  const [email, setEmail] = useState<string>();

  const handleCredentialChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void => setEmail(value);

	const sendVerificationEmail = () => {
		dispatch(updateModal({
			payload: { isLoading: true },
			target: 'resetPassword',
		}));

		setTimeout(() => {
			dispatch(updateModal({
				target: 'resetPassword',
				payload: {
					response: 'sent',
					isLoading: false,
				}
			}));

			setAllowEmailEdit(false);
			setEmail('');
		}, 5000);
	};

  return (
    <AuthFormWrapper>
			<p>
				{response !== 'sent' ? (
					'In order to assist you, kindly provide the email address registered to your account'
				) : (
					'Password reset instructions have been sent to your email.'
				)}
			</p>

			<InputField
				onChange={handleCredentialChange}
				placeholder="example@abcmail.com"
				disabled={!allowEmailEdit}
				label="Email"
				value={email}
				size="large"
				name="email"
				type="email"
				id="email"
				required
			/>

			{allowEmailEdit ? (
				<Button
					onClick={sendVerificationEmail}
					disabled={!email || isLoading}
					loading={isLoading}
					htmlType="submit"
					type="primary"
					size="large"
				>
					{!isLoading && 'Continue'}
				</Button>
			) : (
				<div>
					<Button
						className="edit-email"
						onClick={editEmail}
						htmlType="button"
						size="middle"
					>
						Edit Email
					</Button>
				</div>
			)}
    </AuthFormWrapper>
  );
};

export default PasswordResetForm;