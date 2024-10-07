// MapComponent.tsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapView = ( location: any ) => {

  const mapURL = `https://www.google.com/maps/embed/v1/view?key=AIzaSyDrChjbC3FNxdThgcO3suFGY7VrjQFyVYA&center=${location.latitude},${location.longitude}&zoom=15`;

  return (
    <div className="">
        <iframe
            title="Station Location"
            width="100%"
            height="300"
            style={{ border: 0 }}
            src={mapURL}
        />
    </div>
  );
};

export default GoogleMapView;
