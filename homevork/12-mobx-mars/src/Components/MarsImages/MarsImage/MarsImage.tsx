import React, {useCallback, useState} from 'react';
import {HeartOutlined, HeartFilled } from '@ant-design/icons';
import {Card} from 'antd';
import {observer} from 'mobx-react-lite';
import {IMarsImage} from '../../../interfaces/marsImage';
import styles from './MarsImage.module.css';
import MarsImages from '../../../mobx/marsImages';
import 'antd/dist/antd.css';

const { Meta } = Card;

type MarsImageProps = {
  image:IMarsImage
};

export const MarsImage = observer(({image}:MarsImageProps) => {
  const [loaded, setLoaded] = useState(true);

  const toggleFavourites = useCallback(() => {
    if (image.isFavorite) {
      MarsImages.removeFromFavorites(image);
    } else {
      MarsImages.addToFavourites(image);
    }
  }, [image]);

  const onLoadHandler = useCallback(() => {
    setLoaded(false);
  }, []);

  const icon = image.isFavorite
    ? <HeartFilled className={styles.heartIcon} onClick={toggleFavourites} />
    : <HeartOutlined className={styles.heartIcon} onClick={toggleFavourites} />;

  return (
    <Card
      hoverable
      className={styles.imageContainer}
      cover={
        <img src={image.img_src} className={styles.image} onLoad={onLoadHandler} alt="" />
            }
      actions={[
        icon,
      ]}
      loading={loaded}
    >
      <Meta
        title={`Rover ${image.rover}`}
        description={`Camera ${image.camera}`}
      />
    </Card>
  );
});
