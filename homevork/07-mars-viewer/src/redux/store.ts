import { configureStore} from '@reduxjs/toolkit';
import marsImagesReducer from './marsImagesSlice';
import menuTabReducer from './menuTabSlice';

export const store = configureStore({
  reducer: {
    marsImages: marsImagesReducer,
    menuTab: menuTabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
