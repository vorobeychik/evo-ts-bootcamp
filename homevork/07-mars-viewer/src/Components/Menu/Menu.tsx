import React, {useCallback} from 'react';
import { Button, InputNumber, PageHeader} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {changeSol, selectSol, fetchImages} from '../../redux/marsImagesSlice';

import {selectMenuTab, switchMenuTab, MenuTab} from '../../redux/menuTabSlice';

type MenuProps = {
  children:React.ReactChild,
};

export default function Menu({children}:MenuProps) {
  const dispatch = useDispatch();
  const selectedSol = useSelector(selectSol);
  const menuTab = useSelector(selectMenuTab);

  const clickFavouritesHandler = useCallback(() => {
    dispatch(switchMenuTab());
  }, [dispatch]);

  const clickPhotosHandler = useCallback(() => {
    dispatch(switchMenuTab());
  }, [dispatch]);

  const inputHandler = useCallback((value:number) => {
    dispatch(changeSol(value));
  }, [dispatch]);

  const loadHandler = useCallback(() => {
    dispatch(fetchImages(selectedSol));
  }, [dispatch, selectedSol]);

    type PrimaryOrDefault = 'primary' | 'default';

    const photosButtonType:PrimaryOrDefault = menuTab === MenuTab.Photos ? 'primary' : 'default';
    const favouritesButtonType:PrimaryOrDefault = menuTab === MenuTab.Favourites ? 'primary' : 'default';

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
            <InputNumber min={0} max={1000} value={selectedSol} onChange={inputHandler} />
            <Button onClick={loadHandler}>Load</Button>
          </>,
        ]}
      >
        {children}
      </PageHeader>
    );
}
