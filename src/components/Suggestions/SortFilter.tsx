import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';

interface SortFilterProps {
  sortBy: 'popularity' | 'date' | 'type';
  setSortBy: (sort: 'popularity' | 'date' | 'type') => void;
  filterType: 'all' | 'transport' | 'amenagement' | 'environnement' | 'social';
  setFilterType: (type: 'all' | 'transport' | 'amenagement' | 'environnement' | 'social') => void;
}

const SortFilter: React.FC<SortFilterProps> = ({
  sortBy,
  setSortBy,
  filterType,
  setFilterType,
}) => {
  const sortOptions = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'date', label: 'Date' },
    { value: 'type', label: 'Catégorie' },
  ];

  const filterOptions = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'transport', label: 'Transport' },
    { value: 'amenagement', label: 'Aménagement' },
    { value: 'environnement', label: 'Environnement' },
    { value: 'social', label: 'Social' },
  ];

  return (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
      <div className="flex items-center space-x-2">
        <ArrowUpDown className="h-4 w-4 text-gray-500" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="input-field min-w-[140px]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              Trier par {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as typeof filterType)}
          className="input-field min-w-[180px]"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortFilter;