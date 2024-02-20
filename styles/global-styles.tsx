'use client';

import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro';
import { Global } from '@emotion/react';
import React from 'react';

import colors from '@/lib/colors';

const customStyles = css`
  body {
    -webkit-tap-highlight-color: ${colors.theme.primary};
    ${tw`antialiased`};
  }
  
  a {
    color: ${colors.theme.primary};

    :hover {
      color: ${colors.theme.primary};
    }
  }

  button, [type='button'], [type='reset'], [type='submit'] {
    background-color: unset;

    :disabled {
      cursor: not-allowed;
    }
  }

  input {
    &.ant-input-outlined.ant-input-status-error:not(.ant-input-disabled) {
      color: ${colors.theme.error};
    }
  }
  
  ::placeholder {
    color: ${colors.theme.placeholder};
  }

  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;