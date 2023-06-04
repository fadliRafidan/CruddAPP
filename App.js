import {Provider} from 'react-redux';
import Navigation from './src/navigation';
import { store } from './src/store';

export default props => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);
