import type { Metadata } from 'next';

import SignIn from '@/components/auth/sign-in';

export const metadata: Metadata = {
  title: 'Login',
};

const Page = () => (
  <SignIn />
);

export default Page;