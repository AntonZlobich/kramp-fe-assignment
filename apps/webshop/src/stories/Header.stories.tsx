import { storiesOf } from '@storybook/react';

import { Header } from '../components/Header';

storiesOf('Header', module)
  .add('default', () => <Header />)
  .add('with items', () => <Header />);
