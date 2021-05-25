import React from 'react';
import { Typography} from 'antd';
import {Status} from '../../redux/marsImagesSlice';

const { Title } = Typography;

type MarsImagesStatusProps = {
  status:Status
};

export function MarsImagesStatus({status}:MarsImagesStatusProps) {
  switch (status) {
    case Status.EmptyArray:
      return (
        <Title level={5}>
          No photos for this sol
        </Title>
      );
    case Status.Failed:
      return (
        <Title level={5}>
          Cannot load images try again later
        </Title>
      );
    case Status.Loaded:
      return (
        <></>
      );
    case Status.Loading:
      return (
        <Title level={5}>
          Loading...
        </Title>
      );
    case Status.NotLoaded:
      return (
        <Title level={5}>
          Photos are not loaded
        </Title>
      );
    default:
      return (
        <></>
      );
  }
}
