import { useState, useRef, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import PopupM from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Map = ({ onModalClose }) => {
  const [position, setPosition] = useState({
    lat: 51.505,
    lng: -0.09,
  });

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);

    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span>"Mark the divesite"</span>
        </Popup>
      </Marker>
    );
  }
  return (
    <PopupM
      trigger={<button className="button">choose divesite </button>}
      modal
    >
      {(close) => (
        <div>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            style={{
              height: '400px',
              backgroundColor: 'black',
              marginTop: '80px',
              marginBottom: '90px',
            }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker />
          </MapContainer>
          <button
            className="button"
            onClick={() => {
              onModalClose(position);
              close();
            }}
          >
            choose marked divesite
          </button>
        </div>
      )}
    </PopupM>
  );
};

export default Map;
