'use client';

import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import tw, { styled } from 'twin.macro';
import colors from '@/lib/colors';
import { Layout } from 'antd';

export const LayoutWrapper = styled(Layout)`
	${tw`w-full h-screen overflow-hidden`};
`;

export const SiderWrapper = styled(Sider)`
	${tw`hidden lg:block min-h-screen lg:px-8 xl:px-16 py-12 text-white overflow-hidden`};
  background: ${colors.theme.primary} !important;

  .container {
    ${tw`h-full flex-col justify-between`};

    h1 {
      margin: 32px 0 12px 0;
			line-height: 47px;
			font-height: 500;
      font-size: 35px;
			color: white;
    }

		h2 {
			color: rgba(255, 255, 255, 0.7);
			line-height: 21px;
			font-weight: 400;
			font-size: 14px;
		}

		.card {
			background: rgba(255, 255, 255, 0.1);
			color: rgba(255, 255, 255, 0.7);
			line-height: 20.83px;
			font-weight: 400;

			.ant-card-head {
				padding-bottom: 0 !important;
				font-size: 16px;
				border: unset;
				color: white;

				div {
					${tw`flex gap-3 items-center`};
				}
			}

			.ant-card-body {
				${tw`flex flex-col gap-2 pt-0`};

				p {
					${tw`flex items-start gap-2`};
					font-size: 14px;

					svg {
						${tw`bg-white fill-white p-1 bg-opacity-70 rounded-md font-bold text-2xl`};
						
					}
				}
			}

			.card-meta {
				${tw`flex mt-3 justify-between items-center`};

				svg {
					font-size: 80%;
				}
				
				.ant-card-meta {
					${tw`flex items-center`};
					
					.ant-card-meta-description {
						color: rgba(255, 255, 255, 0.7);
						line-height: 18.3px;
						font-weight: 400;
						font-size: 12px;
					}

					.ant-card-meta-title {
						line-height: 31px;
						font-weight: 500;
						margin-bottom: 0;
						font-size: 16px;
						color: white;
					}
				}
			}
		}

		.badge {
			${tw`flex items-center whitespace-nowrap gap-2 border border-white justify-center rounded-full px-4 py-1`};
			font-size: 12px;
		}
  }
`;

export const ContentWrapper = styled(Content)`
  ${tw`flex flex-col items-center min-h-screen bg-white px-8 py-12 md:px-20 md:py-24 xl:p-32 overflow-y-auto`};
  color: #7085A2;
`;