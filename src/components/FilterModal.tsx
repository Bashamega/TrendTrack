"use client";

import React, { useState } from "react";

interface FilterModalProps {
  showModal: boolean;
  onClose: () => void;
  onApply: (filters: {
    language: string;
    minStars: number;
    minForks: number;
  }) => void;
  onClear: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  showModal,
  onClose,
  onApply,
  onClear,
}) => {
  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [minStars, setMinStars] = useState<number>(0);
  const [minForks, setMinForks] = useState<number>(0);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-5 w-80">
        <h2 className="text-lg font-bold mb-4">Filter Repositories</h2>
        <div className="mb-4">
          <label className="block text-gray-300">Language:</label>
          <input
            type="text"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="bg-gray-800 text-gray-200 font-bold py-2 px-4 rounded w-full"
            placeholder="e.g. JavaScript"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Minimum Stars:</label>
          <input
            type="number"
            value={minStars}
            onChange={(e) => setMinStars(Number(e.target.value))}
            className="bg-gray-800 text-gray-200 font-bold py-2 px-4 rounded w-full"
            placeholder="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Minimum Forks:</label>
          <input
            type="number"
            value={minForks}
            onChange={(e) => setMinForks(Number(e.target.value))}
            className="bg-gray-800 text-gray-200 font-bold py-2 px-4 rounded w-full"
            placeholder="0"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-1 rounded"
          >
            Cancel
          </button>
          {/* Clear Filters Button */}
          <button
            onClick={() => {
              // Call the onClear function passed from the parent component
              onClear();
              // Reset the filter states (optional)
              setLanguageFilter("");
              setMinStars(0);
              setMinForks(0);
            }}
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
          >
            Clear Filters
          </button>
          <button
            onClick={() => {
              onApply({ language: languageFilter, minStars, minForks });
              onClose();
            }}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
