'use client';

import { ModalProps } from 'antd';

export interface CustomModalProps extends ModalProps {
	isResetPassword?: boolean;
};

export const customModalStylingProps: CustomModalProps = {
	isResetPassword: true,
};