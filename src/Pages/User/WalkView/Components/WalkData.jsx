import { useState, useEffect } from "react";
import { FiActivity, FiMapPin } from "react-icons/fi";
import { WalkTrackingController } from "../../../../BackEnd/Controllers/WalkTrackingController";

const WalkData = ({ tripId, walkStatus }) => {
  const [apiRecords, setApiRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isTrackingVisible = WalkTrackingController.isTrackingVisible(walkStatus);
  const trackingStatusMessage = WalkTrackingController.getTrackingStatusMessage(walkStatus);

  useEffect(() => {
    if (tripId && isTrackingVisible) {
      loadWalkRecords();
    }
  }, [tripId, isTrackingVisible]);

  const loadWalkRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedRecords = await WalkTrackingController.fetchWalkRecords(tripId);
      console.log('📍 Records fetched:', fetchedRecords);
      
      const recordsWithAddresses = await Promise.all(
        fetchedRecords.map(async (record) => {
          
          const hasRealAddress = record.address && 
                                !record.address.startsWith('Lat:') &&
                                record.address !== '';
          
          if (hasRealAddress) {
            return record;
          }
          
          try {
            const address = await reverseGeocode(
              parseFloat(record.lat),
              parseFloat(record.lng)
            );
            return { ...record, address };
          } catch (err) {
            console.error('Error geocoding:', err);
            return { 
              ...record, 
              address: `${record.lat}, ${record.lng}` 
            };
          }
        })
      );
      
      console.log('📍 Records with addresses:', recordsWithAddresses);
      setApiRecords(recordsWithAddresses);
    } catch (err) {
      setError('Error cargando registros: ' + err.message);
      console.error('Error loading walk records:', err);
    } finally {
      setLoading(false);
    }
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        
        const streetAddress = data.results.find(
          result => result.types.includes('street_address') ||
                    result.types.includes('route')
        );
        
        if (streetAddress) {
          return streetAddress.formatted_address;
        }
        
        return data.results[0].formatted_address;
      }
      
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  const sortedRecords = apiRecords
    .sort((a, b) => new Date(b.timeFull) - new Date(a.timeFull));

  if (!isTrackingVisible) {
    return (
      <div className="bg-foreground rounded-2xl shadow-md p-6 border border-border flex-grow">
        <div className="text-center text-gray-500 py-8">
          <FiActivity size={48} className="mx-auto mb-3 text-gray-400" />
          <p className="font-medium text-lg mb-2">Seguimiento no disponible</p>
          <p className="text-sm">{trackingStatusMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-foreground rounded-2xl shadow-md p-4 border border-border text-black flex-grow overflow-y-auto">

      <div className="flex items-center gap-2 mb-3">
        <FiActivity className="text-primary" size={20} />
        <h3 className="font-bold">Seguimiento del paseo</h3>
      </div>
      
      <p className="text-xs text-gray-600 mb-3">{trackingStatusMessage}</p>

      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {loading && (
        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <p className="text-blue-600 text-sm">Cargando registros...</p>
          </div>
        </div>
      )}

      {sortedRecords.length === 0 ? (
        <div className="text-center text-gray-500 py-6">
          <FiMapPin size={32} className="mx-auto mb-2 text-gray-400" />
          <p className="font-medium">No hay registros todavía</p>
          <p className="text-sm">
            {walkStatus?.toLowerCase() === 'activo' 
              ? 'Esperando registros de seguimiento...'
              : walkStatus?.toLowerCase() === 'finalizado'
                ? 'Este paseo no tuvo puntos de seguimiento'
                : 'Los registros aparecerán cuando el paseo esté activo'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {sortedRecords.map((record, index) => (
            <div 
              key={record.id || index} 
              className={`border-b pb-2 border-gray-200 ${
                walkStatus?.toLowerCase() === 'finalizado' ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                <FiMapPin size={14} className="text-primary mt-1 flex-shrink-0" />
                <div className="flex-grow min-w-0">
                  <p className="text-sm text-gray-700 font-medium">
                    {record.time}
                  </p>
                  <p className="text-sm text-gray-800 break-words leading-relaxed">
                    {record.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {walkStatus?.toLowerCase() === 'finalizado' && sortedRecords.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Paseo completado - {sortedRecords.length} punto{sortedRecords.length !== 1 ? 's' : ''} registrado{sortedRecords.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default WalkData;