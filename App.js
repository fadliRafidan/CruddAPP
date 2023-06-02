import {Provider} from 'react-redux';
import Navigation from './navigation';
import { store } from './store';

export default props => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);
