import React, { useEffect } from 'react';
import s from './map.module.scss';
import ReactMapGL, { GeolocateControl, MapEvent, NavigationControl, Popup, ViewportProps } from 'react-map-gl';
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { AddPublicationInput, CreatePublicationPopup } from './CreatePublicationPopup';

export const Map = () => {
  const [getCity, { data, loading, error }] = useLazyQuery(gql`
    query {
      publications {
        id
        firstName
        description
        coordinates
      }
    }
  `);

  const [addPublication] = useMutation(gql`
    mutation AddPublication($firstName: String!, $description: String!, $longitude: String!, $latitude: String!) {
      addPublication(
        addPublicationData: {
          firstName: $firstName
          description: $description
          longitude: $longitude
          latitude: $latitude
        }
      ) {
        firstName
        description
        longitude
        latitude
      }
    }
  `);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  const [viewport, setViewport] = React.useState<ViewportProps>({
    longitude: -122.4376,
    latitude: 37.7577,
    zoom: 8,
  });

  const [isPopupVisible, togglePopup] = React.useState<boolean>(false);

  const onMouseDown = (event: MapEvent) => {
    if (event.rightButton) {
      console.log('event', event);
      setViewport({
        ...viewport,
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
      });
      togglePopup(true);
    }
  };

  const onSubmit = (values: AddPublicationInput) => {
    const { firstName, description } = values;
    const { latitude, longitude } = viewport;

    console.log('firstName', firstName);
    addPublication({ variables: { firstName, description, latitude: String(latitude), longitude: String(longitude) } });
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      onViewportChange={(vp: ViewportProps) => setViewport(vp)}
      onMouseDown={(ev) => onMouseDown(ev)}
    >
      <GeolocateControl
        style={{ right: 10, top: 10 }}
        positionOptions={{ enableHighAccuracy: false }}
        trackUserLocation={true}
        auto
      />
      {isPopupVisible && (
        <CreatePublicationPopup
          latitude={viewport.latitude || 0}
          longitude={viewport.longitude || 0}
          onClose={() => togglePopup(false)}
          onSubmit={onSubmit}
        />
      )}
      <NavigationControl style={{ left: 10, top: 10 }} />
    </ReactMapGL>
  );
};
