import type { Metadata } from 'next';

import EmailVerification from '@/components/auth/verify-email';

export const metadata: Metadata = {
  title: 'Verify Email',
};

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  },
  params: {
    [key: string]: string;
  }
};

const Page = ({ searchParams }: PageProps) => (
  <EmailVerification />
);

export default Page;