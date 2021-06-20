import React, {useCallback} from 'react';
import {Button, InputNumber, PageHeader} from 'antd';
import {observer} from 'mobx-react-lite';
import MenuTab, {MenuTabStatus} from '../../mobx/menuTab';
import MarsImages from '../../mobx/marsImages';

type MenuProps = {
  children:React.ReactChild,
};

export const Menu = observer(({children}:MenuProps) => {
  const clickFavouritesHandler = useCallback(() => {
    MenuTab.switchMenuTab(MenuTabStatus.Favourites);
  }, []);

  const clickPhotosHandler = useCallback(() => {
    MenuTab.switchMenuTab(MenuTabStatus.Photos);
  }, []);

  const inputHandler = useCallback((value:number) => {
    MarsImages.changeSol(value);
  }, []);

  const loadHandler = useCallback(() => {
    MarsImages.fetchImages(MarsImages.solSelected);
  }, [MarsImages.solSelected]);

    type PrimaryOrDefault = 'primary' | 'default';

    const photosButtonType:PrimaryOrDefault = MenuTab.tab === MenuTabStatus.Photos ? 'primary' : 'default';
    const favouritesButtonType:PrimaryOrDefault = MenuTab.tab === MenuTabStatus.Favourites ? 'primary' : 'default';

    return (
      <PageHeader
        title={'Select Sol and press "load"!'}
        extra={[
          <Button onClick={clickPhotosHandler} type={photosButtonType}>
            Photos
          </Button>,
          <Button onClick={clickFavouritesHandler} type={favouritesButtonType}>
            Favourites
          </Button>,
          <>
            <InputNumber min={0} max={1000} value={MarsImages.solSelected} onChange={inputHandler} />
            <Button onClick={loadHandler}>Load</Button>
          </>,
        ]}
      >
        {children}
      </PageHeader>
    );
});
