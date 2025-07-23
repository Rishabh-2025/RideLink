import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else if (activeField === 'destination') {
      setDestination(suggestion);
    }
  };

  return (
    <div>
      {suggestions.map((elem, idx) => {

        return (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(elem)}
            className={`flex items-center gap-4 my-3 rounded-xl border-2 p-3 cursor-pointer border-[#0099A8] bg-gray-100 `}
            role="button"
            tabIndex={0}
          >
            <div className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full">
              <FaMapMarkerAlt className="text-gray-700 text-md" />
            </div>
            <h4 className="font-medium w-full">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
