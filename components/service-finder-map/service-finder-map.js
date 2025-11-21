/* eslint-disable indent */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable no-undef */

import Head from "next/head";
import { useEffect } from "react";
import styles from "./service-finder-map.module.css";

const waitForMap = async () => {
  return new Promise((res) => {
    let interval = setInterval(() => {
      if (typeof L !== "undefined") {
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
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2hlbmRlcnNvbjUiLCJhIjoiY2xqNDc3b3hpMWw4YjNucDk0enJtZjlyciJ9.vy3y2eap6esYOMmsoQXTQw",
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

      // Store all GeoJSON layers and their features to query them on map click
      const allGeoJsonLayers = [];

      // Function to show popup with all services at a given point
      const showServicesAtPoint = (latlng, clickedPoint) => {
        const matchingServices = [];

        // Check only visible GeoJSON layers (those currently on the map)
        allGeoJsonLayers.forEach((geoJsonLayer) => {
          // Only check layers that are currently visible on the map
          if (geoJsonLayer._map) {
            // Check each feature in the layer
            geoJsonLayer.eachLayer((layer) => {
              if (layer.feature) {
                // Quick bounds check first (faster)
                let inBounds = false;
                try {
                  if (layer.getBounds && layer.getBounds().contains(latlng)) {
                    inBounds = true;
                  }
                } catch (e) {
                  // If getBounds fails, assume true and check with point-in-polygon
                  inBounds = true;
                }

                // If in bounds, do accurate point-in-polygon check
                if (inBounds && pointInFeature(clickedPoint, layer.feature)) {
                  const serviceId = layer.feature.properties.serviceId;
                  const service = services.find((x) => x.id === serviceId);
                  if (
                    service &&
                    !matchingServices.find((s) => s.id === service.id)
                  ) {
                    matchingServices.push(service);
                  }
                }
              }
            });
          }
        });

        // Create popup content for all matching services
        if (matchingServices.length > 0) {
          let popupContent = "<div>";
          if (matchingServices.length === 1) {
            popupContent += `<h1 style="margin: 0 0 0.5rem 0; font-size: 1.2rem;">${matchingServices[0].serviceName}</h1>`;
            popupContent += `<p style="margin: 0;"><a href='/nhs-service-finder/${matchingServices[0].id}'>Find out more</a></p>`;
          } else {
            popupContent += `<h2 style="margin: 0 0 1rem 0; font-size: 1.1rem;">Services covering this area (${matchingServices.length})</h2>`;
            matchingServices.forEach((service, index) => {
              const isLast = index === matchingServices.length - 1;
              popupContent += `
              <div style="margin-bottom: ${
                isLast ? "0" : "1rem"
              }; padding-bottom: ${isLast ? "0" : "1rem"}; ${
                !isLast ? "border-bottom: 1px solid #eee;" : ""
              }">
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: bold;">${
                  service.serviceName
                }</h3>
                <p style="margin: 0;">
                  <a href='/nhs-service-finder/${service.id}'>Find out more</a>
                </p>
              </div>
            `;
            });
          }
          popupContent += "</div>";

          L.popup().setLatLng(latlng).setContent(popupContent).openOn(map);
          return true; // Indicate popup was shown
        }
        return false; // No services found
      };

      const onEachFeature = (feature, layer) => {
        // Store reference to feature on layer for point-in-polygon checking
        layer.feature = feature;

        // Intercept clicks on features to show all services (not just this one)
        layer.on("click", (e) => {
          // Close any existing popups first
          map.closePopup();
          // Use Leaflet's event stopping
          L.DomEvent.stopPropagation(e);
          const clickedPoint = { lat: e.latlng.lat, lng: e.latlng.lng };
          showServicesAtPoint(e.latlng, clickedPoint);
        });
      };

      // Function to check if a point is inside a polygon
      // GeoJSON coordinates are [lng, lat], point is {lat, lng}
      const pointInPolygon = (point, polygon) => {
        if (!polygon || !polygon.length) return false;

        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          const xi = polygon[i][0], // lng
            yi = polygon[i][1]; // lat
          const xj = polygon[j][0], // lng
            yj = polygon[j][1]; // lat

          const intersect =
            yi > point.lat !== yj > point.lat &&
            point.lng < ((xj - xi) * (point.lat - yi)) / (yj - yi) + xi;
          if (intersect) inside = !inside;
        }
        return inside;
      };

      // Function to check if point is in a GeoJSON feature
      const pointInFeature = (point, feature) => {
        if (!feature || !feature.geometry) return false;

        const geom = feature.geometry;
        if (geom.type === "Polygon") {
          return pointInPolygon(point, geom.coordinates[0]);
        } else if (geom.type === "MultiPolygon") {
          return geom.coordinates.some((polygon) =>
            pointInPolygon(point, polygon[0])
          );
        }
        return false;
      };

      // Handle map clicks to show all services covering that point
      map.on("click", (e) => {
        // Close any existing popups first
        map.closePopup();
        const clickedPoint = { lat: e.latlng.lat, lng: e.latlng.lng };
        showServicesAtPoint(e.latlng, clickedPoint);
      });

      fetch(
        "https://servicefinder.acecentre.net/raw-data/aac-services-geo.geojson"
      ).then(async (result) => {
        const layer = await result.json();
        const geoJsonLayer = L.geoJSON(layer, {
          onEachFeature: onEachFeature,
        }).addTo(map);
        allGeoJsonLayers.push(geoJsonLayer);
        control.addOverlay(geoJsonLayer, "AAC Services");
      });
      fetch(
        "https://servicefinder.acecentre.net/raw-data/ec-services-geo.geojson"
      ).then(async (result) => {
        const layer = await result.json();
        const geoJsonLayer = L.geoJSON(layer, {
          onEachFeature: onEachFeature,
        });
        allGeoJsonLayers.push(geoJsonLayer);
        control.addOverlay(geoJsonLayer, "EC Services");
      });
      fetch(
        "https://servicefinder.acecentre.net/raw-data/wcs-services-geo.geojson"
      ).then(async (result) => {
        const layer = await result.json();
        const geoJsonLayer = L.geoJSON(layer, {
          onEachFeature: onEachFeature,
        });
        allGeoJsonLayers.push(geoJsonLayer);
        control.addOverlay(geoJsonLayer, "Wheelchair Services");
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
          If you click on a part of the map it will show you all services that
          cover that area.
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
