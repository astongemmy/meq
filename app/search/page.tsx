import type { Metadata } from 'next';

import Search from '@/components/search';

export const metadata: Metadata = {
  title: 'Search'
};

const Searchy = () => (
  <Search />
);

export default Searchy;