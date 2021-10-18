/* eslint-disable no-undef */

import Head from "next/head";
import { useEffect } from "react";
import styles from "./service-finder-map.module.css";

const waitForMap = async () => {
  return new Promise((res) => {
    let interval = setInterval(() => {
      if (L) {
        clearInterval(interval);
        res();
      }
    }, 500);
  });
};

export const ServiceFinderMap = ({ services }) => {
  useEffect(() => {
    const loadMap = async () => {
      await waitForMap();

      const map = L.map("map").setView([54.2511, -4.4631], 6);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(map);

      const control = L.control.layers({}, {}, { collapsed: false });
      control.addTo(map);

      const onEachFeature = (property = "serviceId") => (feature, layer) => {
        const selectedService = services.find(
          (x) => x.id === feature.properties[property]
        );

        layer.bindPopup(
          `
          <div>
            <h1>${selectedService.serviceName}</h1>
            <p>
              <a href='/nhs-service-finder/${selectedService.id}'>Find out more</a>
            </p>
          </div>
          `
        );
      };

      fetch(
        "https://https://servicefinder.acecentre.net/raw-data/aac-services-geo.geojson"
      ).then(async (result) => {
        const layer = await result.json();
        control.addOverlay(
          L.geoJSON(layer, { onEachFeature: onEachFeature() }).addTo(map),
          "AAC Services"
        );
      });
      fetch(
        "https://https://servicefinder.acecentre.net/raw-data/ec-services-geo.geojson"
      ).then(async (result) => {
        const layer = await result.json();
        control.addOverlay(
          L.geoJSON(layer, { onEachFeature: onEachFeature() }),
          "EC Services"
        );
      });
      fetch(
        "https://https://servicefinder.acecentre.net/raw-data/wcs-services-geo.geojson"
      ).then(async (result) => {
        const layer = await result.json();
        control.addOverlay(
          L.geoJSON(layer, { onEachFeature: onEachFeature() }),
          "Wheelchair Services"
        );
      });
    };

    loadMap();
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossOrigin=""
        ></script>
      </Head>
      <div className={styles.textContainer}>
        <p>Please be patient while the map loads.</p>
        <p>
          If you click on a part of the map it will show you which service
          covers that area.
        </p>
        <p>
          You can toggle which type of services you want to see data for in the
          top right hand corner of the map.
        </p>
      </div>
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{
          __html: "<div id='map' style='width:100%; height: 100%;'></div>",
        }}
      ></div>
    </>
  );
};
