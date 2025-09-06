import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -34.6037, // Buenos Aires
  lng: -58.3816,
};

export default function Map() {
  const [path, setPath] = useState(() => {
    const saved = localStorage.getItem("ruta");
    return saved ? JSON.parse(saved) : [];
  });

  const [directions, setDirections] = useState(null);

  const handleClick = (event) => {
    const newPoint = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    const newPath = [...path, newPoint];
    setPath(newPath);
    setDirections(null); // reset al agregar un punto
    localStorage.setItem("ruta", JSON.stringify(newPath));
  };

  const clearPath = () => {
    setPath([]);
    setDirections(null);
    localStorage.removeItem("ruta");
  };

  // si tengo puntos guardados, centrar en el primero
  const center = path.length > 0 ? path[0] : defaultCenter;

  // íconos personalizados (círculos SVG)
  const inicioIcon = {
    path: "M 0,0 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0", // círculo
    fillColor: "black",
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: "#00ff00", // borde verde
    scale: 2,
  };

  const finIcon = {
    path: "M 0,0 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    fillColor: "black",
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: "#ff0000", // borde rojo
    scale: 2,
  };

  return (
    <div className="w-full">
      {/* Botón para limpiar */}
      <div className="mb-2">
        <button
          onClick={clearPath}
          className="bg-danger text-black px-3 py-1 rounded-md hover:bg-foreground"
        >
          Borrar zona
        </button>
      </div>

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onClick={handleClick}
        >
          {path.length >= 2 && !directions && (
            <DirectionsService
              options={{
                origin: path[0],
                destination: path[path.length - 1],
                waypoints: path.slice(1, -1).map((p) => ({
                  location: p,
                  stopover: true,
                })),
                travelMode: "WALKING",
              }}
              callback={(res) => {
                if (res !== null && res.status === "OK") {
                  setDirections(res);
                }
              }}
            />
          )}

          {directions && (
            <DirectionsRenderer
              options={{
                directions: directions,
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "#000000",
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {/* 📍 Marcador de inicio */}
          {path.length > 0 && (
            <Marker
              position={path[0]}
              label={{
                text: "Inicio",
                color: "#ffffff",
                fontWeight: "bold",
              }}
              icon={inicioIcon}
            />
          )}

          {/* 📍 Marcador de destino */}
          {path.length > 1 && (
            <Marker
              position={path[path.length - 1]}
              label={{
                text: "Fin",
                color: "#ffffff",
                fontWeight: "bold",
              }}
              icon={finIcon}
            />
          )}

        </GoogleMap>
      </LoadScript>
    </div>
  );
}
