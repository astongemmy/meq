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

  ::placeholder {
    color: #94A3B8;
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;