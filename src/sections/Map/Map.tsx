import React, { useState } from 'react';
import s from './map.module.scss';
import ReactMapGL, { GeolocateControl, MapEvent, NavigationControl, ViewportProps } from 'react-map-gl';
import { useMutation, useQuery } from '@apollo/client';
import { AddPublicationInput, CreatePublicationPopup } from 'sections/CreatePublicationPopup/CreatePublicationPopup';
import { ADD_PUBLICATION_MUTATION } from 'apollo/mutations';
import { GET_PUBLICATIONS_QUERY } from 'apollo/queries';
import { PublicationsData } from 'apollo/types';
import { MapMarker } from 'sections/MapMarker/MapMarker';
import { Login } from 'sections/Login/Login';

export const Map = () => {
  {
    /* commented out until backend push */
  }
  // const { data, loading, error } = useQuery<PublicationsData>(GET_PUBLICATIONS_QUERY, { pollInterval: 2500 });
  const [addPublication] = useMutation(ADD_PUBLICATION_MUTATION, {
    refetchQueries: [{ query: GET_PUBLICATIONS_QUERY }],
  });

  const [viewport, setViewport] = useState<ViewportProps>({
    longitude: -122.4376,
    latitude: 37.7577,
    zoom: 8,
  });

  const [isAddPublicationVisible, toggleAddPopup] = useState<boolean>(false);

  const onMouseDown = (event: MapEvent) => {
    if (event.rightButton) {
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

    addPublication({ variables: { firstName, description, latitude: String(latitude), longitude: String(longitude) } });
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      className={s.map}
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
      {/* commented out until backend push */}
      {/* <MapMarker data={data} /> */}
      <NavigationControl style={{ left: 10, top: 10 }} />
      <Login />
    </ReactMapGL>
  );
};
