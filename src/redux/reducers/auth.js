import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  user: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const persistConfig = {
  key: 'auth',
  storage: storage,
};

export default persistReducer(persistConfig, authReducer);
