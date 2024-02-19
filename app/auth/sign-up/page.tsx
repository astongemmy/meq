import type { Metadata } from 'next';

import SignUp from '@/components/auth/sign-up';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const Page = () => (
  <SignUp />
);

export default Page;