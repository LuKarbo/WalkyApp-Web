import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { FiMap, FiMapPin } from "react-icons/fi";
import { WalkTrackingController } from "../../../../BackEnd/Controllers/WalkTrackingController";

const containerStyle = {
  width: "100%", 
  height: "400px",
};

const defaultCenter = {
  lat: -34.6037, // Buenos Aires
  lng: -58.3816,
};

export default function WalkMap({ tripId, walkStatus }) {
  const [path, setPath] = useState([]);
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Verificar si el mapa está visible
  const isMapVisible = WalkTrackingController.isMapVisible(walkStatus);
  const mapStatusMessage = WalkTrackingController.getMapStatusMessage(walkStatus);

  // Cargar ruta existente al montar el componente
  useEffect(() => {
    if (tripId && isMapVisible) {
      loadWalkRoute();
    } else {
      // Si no es visible, limpiar el mapa
      setPath([]);
      setDirections(null);
    }
  }, [tripId, isMapVisible]);

  const loadWalkRoute = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const route = await WalkTrackingController.fetchWalkRoute(tripId);
      console.log('📍 Route fetched:', route);
      
      const normalizedPath = route.map(point => ({
        lat: parseFloat(point.lat),
        lng: parseFloat(point.lng)
      }));
      
      console.log('📍 Normalized path:', normalizedPath);
      
      setPath(normalizedPath);
      
      if (normalizedPath.length >= 2) {
        setDirections(null);
      }
    } catch (err) {
      setError('Error cargando ruta: ' + err.message);
      console.error('Error loading walk route:', err);
    } finally {
      setLoading(false);
    }
  };

  // Si el mapa no es visible según el estado del paseo
  if (!isMapVisible) {
    return (
      <div className="w-full">
        <div className="bg-gray-100 rounded-2xl shadow-md p-8 border border-gray-300 h-[400px] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <FiMap size={64} className="mx-auto mb-4 text-gray-400" />
            <p className="font-medium text-lg mb-2">Mapa no disponible</p>
            <p className="text-sm">{mapStatusMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  const center = path.length > 0 ? path[0] : defaultCenter;

  return (
    <div className="w-full">
      {/* Header (sin botón de borrar) */}
      <div className="mb-2 flex items-center gap-2">
        <FiMapPin className="text-primary" size={16} />
        <span className="text-sm text-gray-600">{mapStatusMessage}</span>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <p className="text-blue-600 text-sm">Cargando mapa...</p>
          </div>
        </div>
      )}

      <div className="flex">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
              gestureHandling: 'greedy'
            }}
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
                  polylineOptions: {
                    strokeColor: walkStatus?.toLowerCase() === 'finalizado' ? "#94a3b8" : "#4ade80",
                    strokeOpacity: walkStatus?.toLowerCase() === 'finalizado' ? 0.7 : 1,
                    strokeWeight: 5,
                  },
                }}
              />
            )}

            {/* Marcador de inicio */}
            {path.length === 1 && (
              <Marker
                position={path[0]}
                icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
              />
            )}

            {/* Marcador de fin */}
            {path.length > 1 && walkStatus?.toLowerCase() === 'finalizado' && (
              <Marker
                position={path[path.length - 1]}
                icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
