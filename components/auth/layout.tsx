'use client';

import { Divider, Button, Flex } from 'antd';
import Image from 'next/image';

import { AuthWrapper } from './auth.styled';
import { AuthAction } from './types';

const socialAuthProviders = [
  {
    icon: '/images/icons/google-icon.svg',
    alt: 'google_icon',
    text: 'Google',
    iconSize: 32
  },
  {
    icon: '/images/icons/apple-icon.svg',
    alt: 'apple_icon',
    text: 'Apple',
    iconSize: 27
  }
];

const authActions: AuthAction = {
  signIn: {
    description: 'Enter your details to log in to your account.',
    title: 'Welcome back'
  },
  signUp: {
    description: 'Ensure the details provided are accurate.',
    title: 'Tell us a little about yourself'
  }
};

interface AuthProp {
  children: Readonly<React.ReactNode>;
  authAction: Readonly<string>;
};

const AuthLayout = ({ children, authAction }: AuthProp) => {
  return (
		<AuthWrapper vertical>
      <div>
        <h1>{authActions[authAction].title}</h1>
        
        <p>
          {authActions[authAction].description}
        </p>
      </div>
      
      {['signUp', 'signIn'].includes(authAction) && (
        <>
          <Flex gap={24} justify="space-between" align="center" className="social-auth">
            {socialAuthProviders.map(({ iconSize, text, icon, alt }) => (
              <Button key={text} size="large" icon={<Image src={icon} height={iconSize} width={iconSize} alt={alt} />} htmlType="button" block>
                {authAction === 'signIn' ? 'Login' : 'Sign up'} with {text}
              </Button>
            ))}
          </Flex>

          <Divider plain className="divider">or</Divider>
        </>
      )}

      {children}
    </AuthWrapper>
  );
};

export default AuthLayout;
