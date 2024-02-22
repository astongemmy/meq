import type { Metadata } from 'next';

import EmailVerification from '@/components/auth/verify-email';

export const metadata: Metadata = {
  title: 'Verify Email',
};

const Page = () => (
  <EmailVerification />
);

export default Page;