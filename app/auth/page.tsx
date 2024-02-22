import type { Metadata } from 'next';

import SignIn from '@/components/auth/sign-in';

export const metadata: Metadata = {
  title: {
    absolute: 'Login | Mega Quest Authentication'
  }
};

const Page = () => (
  <SignIn />
);

export default Page;