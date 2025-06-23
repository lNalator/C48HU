import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Icon, LatLng } from "leaflet";
import { Plus } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { Suggestion } from "../../types";
import SuggestionPopup from "./SuggestionPopup";
import AddSuggestionModal from "./AddSuggestionModal";

// Custom marker icons
const createMarkerIcon = (type: string) => {
  const colors = {
    transport: "#3B82F6",
    amenagement: "#10B981",
    environnement: "#F59E0B",
    social: "#8B5CF6",
  };

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="${
          colors[type as keyof typeof colors]
        }" stroke="white" stroke-width="3"/>
      </svg>
    `)}`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const MapEventHandler: React.FC<{ onMapClick: (latlng: LatLng) => void }> = ({
  onMapClick,
}) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const InteractiveMap: React.FC = () => {
  const { suggestions, user } = useAppStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSuggestionPosition, setNewSuggestionPosition] =
    useState<LatLng | null>(null);

  const handleMapClick = (latlng: LatLng) => {
    if (user?.isAuthenticated) {
      setNewSuggestionPosition(latlng);
      setShowAddModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewSuggestionPosition(null);
  };

  return (
    <>
      <div className="relative h-[45rem] z-0">
        <MapContainer
          center={[44.833328, -0.56667]}
          zoom={15}
          className="h-full w-full rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapEventHandler onMapClick={handleMapClick} />

          {suggestions.map((suggestion) => (
            <Marker
              key={suggestion.id}
              position={[suggestion.position.lat, suggestion.position.lng]}
              icon={createMarkerIcon(suggestion.type)}
            >
              <Popup className="custom-popup">
                <SuggestionPopup suggestion={suggestion} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {user?.isAuthenticated && (
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-white rounded-lg shadow-lg p-3 text-sm text-gray-600 mb-2 max-w-48">
              Cliquez sur la carte pour ajouter une suggestion
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>

      <AddSuggestionModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        position={newSuggestionPosition}
      />
    </>
  );
};

export default InteractiveMap;
