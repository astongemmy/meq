'use client';

import { Divider, Button } from 'antd';
import Image from 'next/image';

import { AuthWrapper } from './auth.styled';
import { AuthAction } from './types';

const socialAuthProviders = [
  {
    icon: '/images/icons/google-icon.svg',
    alt: 'google_icon',
    text: 'Google',
  },
  {
    icon: '/images/icons/apple-icon.svg',
    alt: 'apple_icon',
    text: 'Apple',
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
          <div className="social-auth">
            {socialAuthProviders.map(({ text, icon, alt }) => (
              <Button key={text} icon={<Image height={32} width={32} src={icon} alt={alt} />} htmlType="button">
                {authAction === 'signUp' ? 'Login' : 'Sign up'} with {text}
              </Button>
            ))}
          </div>

          <Divider plain className="divider">or</Divider>
        </>
      )}

      {children}
    </AuthWrapper>
  );
};

export default AuthLayout;
