import '@testing-library/jest-dom';

import { renderWithProviders } from '@/tests/redux-wrapper';
import Page from '../index';
 
describe('Page', () => {
  it('renders a heading', () => {
    const { getByText } = renderWithProviders(<Page />);
 
    const heading = getByText('Templates');
 
    expect(heading).toBeInTheDocument();
  });
});