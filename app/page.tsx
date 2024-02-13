import type { Metadata } from 'next';

import Home from '@/components/home';

export const metadata: Metadata = {
  title: 'Home | Mega Quest',
};

const Homey = () => (
  <Home />
);

export default Homey;