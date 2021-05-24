import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {PageHeader} from 'antd';
import {MarsImage} from './MarsImage/MarsImage';
import {
  selectMarsImages, selectStatus, selectFavouritesMarsImages, selectSol, Status,
} from '../../redux/marsImagesSlice';
import {MarsImagesStatus} from '../MarsImagesStatus/MarsImagesStatus';

import {RootState} from '../../redux/store';

import styles from './MarsImages.module.css';
import {selectMenuTab, MenuTab} from '../../redux/menuTabSlice';

export function MarsImages() {
  const status = useSelector(selectStatus);
  const selectedSol = useSelector(selectSol);
  const tabSelected = useSelector(selectMenuTab);
  const imagesData = useSelector((state:RootState) => selectMarsImages(state, selectedSol)) ?? [];
  const favouritesImageData = useSelector(selectFavouritesMarsImages);

  const images = useMemo(() => {
    const data = tabSelected === MenuTab.Photos ? imagesData : favouritesImageData;
    return data.map((imageData) => <MarsImage image={imageData} key={imageData.id} />);
  }, [imagesData, favouritesImageData, tabSelected]);

  return (
    <PageHeader>
      <div className={styles.marsImages}>
        <MarsImagesStatus status={status} />
        <div className={styles.imagesContainer}>
          {status === Status.Loaded && images}
        </div>
      </div>
    </PageHeader>
  );
}
