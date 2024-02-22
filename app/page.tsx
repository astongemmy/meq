import type { Metadata } from 'next';

import Home from '@/components/home';

export const metadata: Metadata = {
  title: 'Home | Mega Quest Admin Console',
};

const Page = () => (
  <Home />
);

export default Page;