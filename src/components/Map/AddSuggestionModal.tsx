import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LatLng } from 'leaflet';
import { useAppStore } from '../../store/useAppStore';

interface AddSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: LatLng | null;
}

const AddSuggestionModal: React.FC<AddSuggestionModalProps> = ({ isOpen, onClose, position }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'transport' | 'amenagement' | 'environnement' | 'social'>('amenagement');
  const { addSuggestion, user } = useAppStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && position && user) {
      addSuggestion({
        title: title.trim(),
        description: description.trim(),
        type,
        position: {
          lat: position.lat,
          lng: position.lng,
        },
        author: user.name,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setType('amenagement');
      onClose();
    }
  };

  if (!isOpen) return null;

  const typeOptions = [
    { value: 'transport', label: 'Transport' },
    { value: 'amenagement', label: 'Aménagement' },
    { value: 'environnement', label: 'Environnement' },
    { value: 'social', label: 'Social' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Nouvelle suggestion</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="Ex: Créer une piste cyclable"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field resize-none"
              rows={3}
              placeholder="Décrivez votre suggestion en détail..."
              required
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="input-field"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {position && (
            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              <p><strong>Position:</strong></p>
              <p>Latitude: {position.lat.toFixed(6)}</p>
              <p>Longitude: {position.lng.toFixed(6)}</p>
            </div>
          )}
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSuggestionModal;