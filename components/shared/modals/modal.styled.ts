import tw, { styled } from 'twin.macro';
import { Modal } from 'antd';

import { customModalStylingProps, CustomModalProps } from '.';

const width = ({ isResetPassword }: CustomModalProps) => isResetPassword && '520px !important';
const marginRight = ({ isResetPassword }: CustomModalProps) => isResetPassword && '-40%';
const twStyles = (props: CustomModalProps) => {
	const twCss: { [key: string]: object } = {
		isResetPassword: tw`mt-auto`,
	};
	
	const stylingProps = Object.entries(props).filter(([key, value]) => (
		key in customModalStylingProps && value) && key
	).map(([key]) => key);

	const styles = stylingProps.map((prop) => twCss[prop]);

	return Object.assign({}, ...styles);
};

export const ModalWrapper = styled(Modal)`
	margin-right: ${(props: CustomModalProps) => marginRight(props)};
	width: ${(props: CustomModalProps) => width(props)};

	@media (max-width: 786px) {
		margin-right: auto;
	}

	.ant-modal-title {
		line-height: 31px;
		font-weight: 500;
		font-size: 24px;
		color: #0a0d29;
		${tw`pt-4`};
	}

	.ant-modal-content {
		${tw`pb-8`};
	}
`;