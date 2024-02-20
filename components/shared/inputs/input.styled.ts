'use client';

import tw, { styled } from 'twin.macro';

export const InputWrapper = styled.div`
	${tw`flex flex-col gap-2 relative`};

    &.otp {
        input {
            ${tw`text-center`};
        }
    }  

    label {
        line-height: 21px;
        font-weight: 400;
        font-size: 16px;
        color: #1e293b;
    }

    input {
        font-family: Helvetica Neue;
        line-height: 21px;
        font-weight: 400;
        font-size: 16px;  

        :placeholder {
            color: #94A3B8;
        }
    }
`;