import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IMarsImage} from '../interfaces/marsImage';
import {RootState} from './store';

export enum Status {
  Loading = 'Loading',
  NotLoaded = 'NotLoaded',
  Loaded = 'Loaded',
  Failed = 'Failed',
  EmptyArray = 'EmptyArray',

}

type Images = {
  [key: string]: IMarsImage[];
};

type InitialState = {
  images: Images,
  favoriteImages:IMarsImage[],
  solSelected:number,
  status:Status,
};

type ServerResponse = {
  photos:{
    id:number,
    img_src:string,
    rover:{name:string}
    camera:{full_name:string}
  }[]
};

const initialState:InitialState= {
  images: {},
  favoriteImages: [],
  solSelected: 0,
  status: Status.NotLoaded,
};

export const fetchImages:any = createAsyncThunk<IMarsImage[], number, {}>(
  'marsImages/fetchMarsImages',
  async (sol:number) => {
    const res = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&page=2&api_key=gB92ijgzKbffEy2HfTNDlrvGbCP97NofvGwuqUlJ`,
      {
        method: 'GET',
      },
    );

    const data:ServerResponse = await res.json();
    const mappedData:IMarsImage[] = data.photos.map((image) => ({
      id: image.id,
      img_src: image.img_src,
      rover: image.rover.name,
      camera: image.camera.full_name,
      isFavorite: false,
    }));

    return mappedData;
  },
);

export const marsImagesSlice = createSlice({
  name: 'marsImages',
  initialState,
  reducers: {
    addToFavorites: (state, action:PayloadAction<IMarsImage>) => {
      const index = state.images[state.solSelected].findIndex((image) => image.id === action.payload.id);
      state.images[state.solSelected][index].isFavorite = true;
      state.favoriteImages.push(state.images[state.solSelected][index]);
    },
    removeFromFavorites: (state, action:PayloadAction<number>) => {
      const index = state.images[state.solSelected].findIndex((image) => image.id === action.payload);
      state.images[state.solSelected][index].isFavorite = false;
      state.favoriteImages = state.favoriteImages.filter((marsImage:IMarsImage) => marsImage.id !== action.payload);
    },
    changeSol: (state, action:PayloadAction<number>) => {
      if (!state.images[action.payload]) {
        state.status = Status.NotLoaded;
      } else {
        state.status = Status.Loaded;
      }
      state.solSelected = action.payload;
    },
  },
  extraReducers: {
    [fetchImages.pending]: (state:InitialState) => {
      state.status = Status.Loading;
    },
    [fetchImages.fulfilled]: (state:InitialState, action:PayloadAction<IMarsImage[]>) => {
      state.status = action.payload.length ? Status.Loaded : Status.EmptyArray;
      state.images[state.solSelected] = action.payload;
    },
    [fetchImages.rejected]: (state:InitialState) => {
      state.status = Status.Failed;
    },
  },

});

export default marsImagesSlice.reducer;

export const {changeSol, removeFromFavorites, addToFavorites} = marsImagesSlice.actions;

export const selectStatus = (state:RootState) => state.marsImages.status;
export const selectMarsImages = (state:RootState, sol:number) => state.marsImages.images[sol];
export const selectFavouritesMarsImages = (state:RootState) => state.marsImages.favoriteImages;
export const selectSol = (state:RootState) => state.marsImages.solSelected;
