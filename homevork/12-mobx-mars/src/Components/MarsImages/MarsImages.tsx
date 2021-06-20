import React, {useMemo} from 'react';
import {PageHeader} from 'antd';
import {observer} from 'mobx-react-lite';
import {MarsImage} from './MarsImage/MarsImage';
import {MarsImagesStatus} from '../MarsImagesStatus/MarsImagesStatus';
import MenuTab, {MenuTabStatus} from '../../mobx/menuTab';
import MarsImagesStore, {Status} from '../../mobx/marsImages';

import styles from './MarsImages.module.css';

export const MarsImages = observer(() => {
  const {status} = MarsImagesStore;
  const selectedSol = MarsImagesStore.solSelected;
  const imagesData = MarsImagesStore.images[selectedSol] ?? [];
  const favouritesImageData = MarsImagesStore.favoriteImages;

  const images = useMemo(() => {
    const data = MenuTab.tab === MenuTabStatus.Photos ? imagesData : favouritesImageData;
    return data.map((imageData) => <MarsImage image={imageData} key={imageData.id} />);
  }, [imagesData, favouritesImageData, MenuTab.tab]);

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
});
