import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles/map.css";
import mapboxgl from "mapbox-gl";
import { MDBRange } from "mdb-react-ui-kit";

export default function Globe() {
  //const Globe: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  //const globe = useRef<HTMLDialogElement>(null)
  const [map, setMap] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoid21hcmVjaSIsImEiOiJjbTB5bjBwcGcwb2xlMmtvZXk3cTk4MXJvIn0.yL9d8ZK-LOyhYsdJ4i7VdQ";

    if (mapContainerRef.current && !map) {
      const globe = new mapboxgl.Map({
        container: mapContainerRef.current || "",
        style: "mapbox://styles/mapbox/satellite-v9",
        projection: "globe",
        center: [-70.9, 42.35],
        zoom: 1.5,
      });
      setMap(map);

      globe.on("style.load", () => {
        globe.setFog({});
      });

      const secondsPerRevolution = 120;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      //let spinEnabled = true;

      const spinGlobe = () => {
        const zoom = globe.getZoom();
        //if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        if (!userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = globe.getCenter();
          center.lng -= distancePerSecond;
          globe.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      };

      globe.on("mousedown", () => {
        userInteracting = true;
      });

      globe.on("mouseup", () => {
        userInteracting = false;
        spinGlobe();
      });

      globe.on('dragend', () => {
        userInteracting = false
        spinGlobe()
      })

      globe.on('pitchend', () => {
        userInteracting = false
        spinGlobe()
      })

      globe.on('rotateend', () => {
        userInteracting = false
        spinGlobe()
      })

      globe.on("moveend", () => {
        spinGlobe();
      });

      spinGlobe();
    }
  }, [mapContainerRef, map]);

  return (
    <div>
      <div className="pb-3">
        <p className="text-center">
          Then&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now
        </p>
        <MDBRange
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
          defaultValue={0}
          disableTooltip={true}
          min="-2000"
          max="2024"
        />
      </div>
      <div
        style={{ marginTop: "-10px" }}
        ref={mapContainerRef}
        className="map-container"
      ></div>
    </div>
  );
}

//export default Globe
