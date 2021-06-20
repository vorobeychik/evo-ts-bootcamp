import {action, makeAutoObservable} from 'mobx';
import {IMarsImage} from '../interfaces/marsImage';

export enum Status {
  Loading = 'Loading',
  NotLoaded = 'NotLoaded',
  Loaded = 'Loaded',
  Failed = 'Failed',
  EmptyArray = 'EmptyArray',

}

type ServerResponse = {
  photos:{
    id:number,
    img_src:string,
    rover:{name:string}
    camera:{full_name:string}
  }[]
};

type Images = {
  [key: string]: IMarsImage[];
};

class MarsImages {
  images:Images = {};

  favoriteImages:IMarsImage[] = [];

  solSelected = 0;

  status = Status.NotLoaded;

  constructor() {
    makeAutoObservable(this, {
      changeSol: action.bound,
      addToFavourites: action.bound,
      removeFromFavorites: action.bound,
      fetchImages: action.bound,
    });
  }

  changeSol(sol:number) {
    if (!this.images[sol]) {
      this.status = Status.NotLoaded;
    } else {
      this.status = Status.Loaded;
    }

    this.solSelected = sol;
  }

  addToFavourites(Image:IMarsImage) {
    const index = this.images[this.solSelected].findIndex((image) => image.id === Image.id);
    this.images[this.solSelected][index].isFavorite = true;
    this.favoriteImages.push(this.images[this.solSelected][index]);
  }

  removeFromFavorites(Image:IMarsImage) {
    const index = this.images[this.solSelected].findIndex((image) => image.id === Image.id);
    this.images[this.solSelected][index].isFavorite = false;
    this.favoriteImages = this.favoriteImages.filter((marsImage:IMarsImage) => marsImage.id !== Image.id);
  }

  async fetchImages(sol:number) {
    this.status = Status.Loading;
    const res = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&page=2&api_key=gB92ijgzKbffEy2HfTNDlrvGbCP97NofvGwuqUlJ`,
      {
        method: 'GET',
      },
    );

    const data:ServerResponse = await res.json();

    this.status = data.photos.length ? Status.Loaded : Status.EmptyArray;
    const mappedData:IMarsImage[] = data.photos.map((image) => ({
      id: image.id,
      img_src: image.img_src,
      rover: image.rover.name,
      camera: image.camera.full_name,
      isFavorite: false,
    }));

    this.images[sol] = mappedData;
  }
}

export default new MarsImages();
