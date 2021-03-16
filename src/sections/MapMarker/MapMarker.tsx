import React from 'react';
import { PublicationsData } from 'apollo/types';
import { Marker } from 'react-map-gl';
import { StarTwoTone } from '@ant-design/icons';
import s from './mapMarker.module.scss';
import { Card } from 'antd';

type Props = {
  data: PublicationsData | undefined;
};

export const MapMarker = ({ data }: Props) => {
  if (!data) return null;
  if (!data?.publications?.length) return null;

  return (
    <>
      {data.publications.map((pub) => (
        <Marker key={pub.id} latitude={Number(pub.latitude)} longitude={Number(pub.longitude)}>
          <StarTwoTone className={s.starIcon} spin />
          <Card className={s.infoCard} title={`${pub.firstName}'s publication`}>
            <p>Name: {pub.firstName}</p>
            <p>Description: {pub.description}</p>
          </Card>
        </Marker>
      ))}
    </>
  );
};
