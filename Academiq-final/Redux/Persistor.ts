import { persistStore } from 'redux-persist';
import store from '../Redux/store/store';

const persistor = persistStore(store);

export default persistor;
