import {action, makeAutoObservable} from 'mobx';

export enum MenuTabStatus{
  Photos = 'Photos',
  Favourites = 'Favourites',
}

class MenuTab {
  tab = MenuTabStatus.Photos;

  constructor() {
    makeAutoObservable(this, {
      switchMenuTab: action.bound,
    });
  }

  switchMenuTab(tabName:MenuTabStatus) {
    if (tabName === MenuTabStatus.Photos) {
      this.tab = MenuTabStatus.Photos;
    } else if (tabName === MenuTabStatus.Favourites) {
      this.tab = MenuTabStatus.Favourites;
    }
  }
}

export default new MenuTab();
