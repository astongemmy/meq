'use client';

import { customModalStylingProps } from '@/components/shared/modals';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ModalWrapper } from '../../shared/modals/modal.styled';
import { updateModal } from '../../shared/modals/reducer';
import PasswordResetForm from '../forms/password-reset';
import Image from 'next/image';

const PasswordResetModal = () => {
	const dispatch = useAppDispatch();
	const {
		resetPassword: {
			isLoading,
			response,
			open
		}
	} = useAppSelector(state => state.modal);

  const handleCancel = () => dispatch(updateModal({
		target: 'resetPassword',
		payload: {
			isLoading: false,
			response: null,
			open: false
		}
	}));

	const ModalHeader = () => (
		<>
			{response === 'sent' && (
				<Image
					src="/images/icons/verify-email.svg"
					style={{ marginBottom: 12 }}
					alt="verify_email_icon"
					height={100}
					width={88}
				/>
			)}

			{response !== 'sent' ? 'Forgot Password?' : 'Check your inbox'}
		</>
	);

  return (
		<ModalWrapper
			{...customModalStylingProps}
			confirmLoading={isLoading}
			onCancel={handleCancel}
			title={<ModalHeader />}
			closeIcon={null}
			footer={null}
			open={open}
		>
			<PasswordResetForm />
		</ModalWrapper>
  );
};

export default PasswordResetModal;