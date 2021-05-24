import React, {useCallback, useState} from 'react';
import {HeartOutlined, HeartFilled } from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {Card} from 'antd';
import {IMarsImage} from '../../../interfaces/marsImage';
import styles from './MarsImage.module.css';
import {addToFavorites, removeFromFavorites} from '../../../redux/marsImagesSlice';
import 'antd/dist/antd.css';

const { Meta } = Card;

type MarsImageProps = {
  image:IMarsImage
};

export function MarsImage({image}:MarsImageProps) {
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(true);

  const toggleFavourites = useCallback(() => {
    if (image.isFavorite) {
      dispatch(removeFromFavorites(image.id));
    } else {
      dispatch(addToFavorites(image));
    }
  }, [dispatch, image]);

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
}
