'use client';

import tw, { styled } from 'twin.macro';
import colors from '@/lib/colors';

export const AuthFormWrapper = styled.form`
	${tw`flex flex-col gap-6`};

	p {
		line-height: 20px;
		font-weight: 400;
		font-size: 16px;
		color: #7085a2;
	}

	.input-wrapper {
		${tw`flex flex-col gap-2 relative`};

		&.verify-email {
			${tw`flex-row gap-8`}

			input[type='tel'] {
				${tw`w-1/6 text-center`};
			}
		}

		label {
			line-height: 21px;
			font-weight: 400;
			font-size: 16px;
			color: #1e293b;
		}

		input[type='email'], input[type='password'], input[type='text'], input[type='tel'] {
			${tw`w-full px-6 py-4 rounded-lg outline-none`};
			font-family: Helvetica Neue;
			border: 1px solid #e2e8f0;
			border-radius: 15px;
			line-height: 21px;
			font-weight: 400;
			font-size: 16px;

			:placeholder {
				color: #94A3B8;
			}

			:disabled {
				cursor: not-allowed;
			}

			&.error {
				border-color: #fb1073;
				color: #fb1073;
			}
		}
	}

	.password-error, .otp-error {
		${tw`flex gap-2`};
		line-height: 18px;
		font-size: 12px;
		color: #fb1073;
	}

	.password-wrapper {
		${tw`relative`};

		.toggle-password {
			${tw`absolute right-4 top-1/2 -translate-y-1/2 text-3xl`};
			color: #7085a2;
		}
	}

	.forgot-password {
		${tw`flex justify-end`};

		button {
			text-align: right;
			line-height: 16px;
			font-weight: 500;
			font-size: 12px;
			color: #2f42fa;

			:disabled {
				color: #7085a2;
			}
		}
	}

	.password-requirements {
		h3 {
			margin-bottom: 10px;
			font-weight: 500;
			color: #061047;
		}

		ul {
			padding-left: 14px;
			line-height: 16px;
			font-weight: 400;
			list-style: disc;
			font-size: 12px;
		}
	}

	.accept-terms {
		p {
			font-family: Helvetica Neue;
			line-height: 16px;
			font-weight: 400;
			font-size: 13px;
			color: #1e293b;
		}

		.ant-checkbox .ant-checkbox-inner {
			border-color: ${colors.theme.primary};
			height: 24px;
			width: 24px;

			&:after {
				height: 14.142857px;
			}
		}
	}

	.request-code {
		${tw`flex gap-4 items-center text-left mb-5`};
		line-height: 16px;
		font-weight: 500;
		color: #2f42fa;

		:disabled {
			cursor: not-allowed;
			color: #7085a2;
		}
	}

	button {
		&[type='submit'] {
			${tw`w-full px-4 py-4 cursor-pointer`};
			background: ${colors.theme.primary};
			border-radius: 12px;
			line-height: 23px;
			font-weight: 500;
			font-size: 18px;
			color: white;

			:disabled {
				background: #dfe2ff;
			}
		}

		&.error {
			background: ${colors.theme.tertiary};
		}

		&.edit-email {
			border-color: ${colors.theme.primary};
			color: ${colors.theme.primary};
		}
	}

	.create-account {
		line-height: 18px;
		font-weight: 500;
		font-size: 14px;
		color: #1e293b;

		a {
			font-family: Helvetica Neue;
			line-height: 17px;
			color: #2f42fa;
		}
	}
`;