'use client';

import { ChangeEvent, useState } from 'react';

import { updateModal } from '@/components/shared/modals/reducer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuthFormWrapper } from './form.styled';
import { Button } from 'antd';


interface PasswordResetError {
  emailNotFound: boolean;
};

const PasswordResetForm = () => {
	const dispatch = useAppDispatch();
  
	const [passwordResetError, setPasswordResetError] = useState<PasswordResetError>({
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

      <div className="input-wrapper">
        <label htmlFor="email">Email</label>

        <input
          onChange={handleCredentialChange}
          placeholder="example@abcmail.com"
					disabled={!allowEmailEdit}
          value={email}
          name="email"
          type="email"
          id="email"
        />
      </div>

      <div>
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
					<Button
						className="edit-email"
						onClick={editEmail}
						htmlType="button"
						size="middle"
					>
						Edit Email
					</Button>
				)}
      </div>
    </AuthFormWrapper>
  );
};

export default PasswordResetForm;