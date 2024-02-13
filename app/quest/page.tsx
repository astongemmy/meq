import type { Metadata } from 'next';

import Home from '@/components/home';

export const metadata: Metadata = {
  title: 'Quest'
};

const Quest = () => (
  <Home />
);

export default Quest;