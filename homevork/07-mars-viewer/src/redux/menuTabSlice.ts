import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';

export enum MenuTab{
  Photos = 'Photos',
  Favourites = 'Favourites',
}

const initialState= MenuTab.Photos;

export const menuTabSlice = createSlice({
  name: 'selectedTab',
  initialState,
  reducers: {
    switchMenuTab: (state) => {
      if (state === MenuTab.Photos) {
        state = MenuTab.Favourites;
      } else if (state === MenuTab.Favourites) {
        state = MenuTab.Photos;
      }
      return state;
    },
  },
});

export default menuTabSlice.reducer;

export const {switchMenuTab} = menuTabSlice.actions;

export const selectMenuTab = (state:RootState) => state.menuTab;
