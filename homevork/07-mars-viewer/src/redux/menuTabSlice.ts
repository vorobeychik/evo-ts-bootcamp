import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
    switchMenuTab: (state, action:PayloadAction<MenuTab>) => {
      if (action.payload === MenuTab.Photos) {
        state = MenuTab.Photos;
      } else if (action.payload === MenuTab.Favourites) {
        state = MenuTab.Favourites;
      }
      return state;
    },
  },
});

export default menuTabSlice.reducer;

export const {switchMenuTab} = menuTabSlice.actions;

export const selectMenuTab = (state:RootState) => state.menuTab;
