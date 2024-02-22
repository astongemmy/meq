'use client';

import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { Flex } from 'antd';

import colors from '@/lib/colors';

export const AuthWrapper = styled(Flex)`
	${tw`w-full gap-6 md:gap-8`};
		
	h1 {
		margin-bottom: 12px;
		line-height: 42px;
		font-weight: 500;
		font-size: 32px;
		color: #0a0d29;
	}

	p {
		line-height: 20px;
		font-weight: 400;
		font-size: 16px;
	}

	.social-auth {
		${tw`flex-col md:flex-row`};

		button {
			color: #262626 !important;
			line-height: 22.91px;
			font-size: 17.59px;
			font-weight: 400;

			span.ant-btn-icon {
				${tw`absolute left-4 top-1/2 -translate-y-1/2`}
			}
		}
	}

	.divider {
		font-family: Helvetica Neue;
		line-height: 17px;
		font-weight: 400;
		font-size: 14px;
		color: #94a3b8;
	}
`;

export const LinkWrapper = styled(Link)`
	${tw`w-full inline-block text-center px-4 py-4 cursor-pointer`};
	background: ${colors.theme.primary};
	border-radius: 12px;
	line-height: 23px;
	font-weight: 500;
	font-size: 18px;
	color: white;
	
	&.verification-failed {
		background: ${colors.theme.secondary};
	}

	&:hover {
		opacity: 0.7;
		color: white;
	}
`;