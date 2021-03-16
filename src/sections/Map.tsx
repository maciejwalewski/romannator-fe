import React, { useEffect } from 'react';
import s from './map.module.scss';
import ReactMapGL, { GeolocateControl, MapEvent, NavigationControl, ViewportProps } from 'react-map-gl';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AddPublicationInput, CreatePublicationPopup } from './CreatePublicationPopup';
import { ADD_PUBLICATION_MUTATION } from 'apollo/mutations';
import { GET_PUBLICATIONS_QUERY } from 'apollo/queries';
import { PublicationsData } from 'apollo/types';
import { MapMarker } from './MapMarker/MapMarker';

export const Map = () => {
  const [getPublications, { data, loading, error }] = useLazyQuery<PublicationsData>(GET_PUBLICATIONS_QUERY);
  const [addPublication] = useMutation(ADD_PUBLICATION_MUTATION);

  useEffect(() => {
    getPublications();
  }, []);
  useEffect(() => {
    console.log('publications', data);
  }, [data]);

  const [viewport, setViewport] = React.useState<ViewportProps>({
    longitude: -122.4376,
    latitude: 37.7577,
    zoom: 8,
  });

  const [isAddPublicationVisible, toggleAddPopup] = React.useState<boolean>(false);

  const onMouseDown = (event: MapEvent) => {
    if (event.rightButton) {
      console.log('event', event);
      setViewport({
        ...viewport,
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
      });
      toggleAddPopup(true);
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
      {isAddPublicationVisible && (
        <CreatePublicationPopup
          latitude={viewport.latitude || 0}
          longitude={viewport.longitude || 0}
          onClose={() => toggleAddPopup(false)}
          onSubmit={onSubmit}
        />
      )}
      <MapMarker data={data} />
      <NavigationControl style={{ left: 10, top: 10 }} />
    </ReactMapGL>
  );
};
