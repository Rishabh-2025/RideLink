import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const LocationSearchPanel = ({setVehiclePanel,setPanelOpen}) => {
  const locations = [
    "24, near Kapoor's Cafe, Sheriya Coding School, Bhopal, Madhya Pradesh",
    "23, near Kapoor's Cafe, Sheriya Coding School, Bhopal, Madhya Pradesh",
    "25, near Kapoor's Cafe, Sheriya Coding School, Bhopal, Madhya Pradesh",
    "26, near Kapoor's Cafe, Sheriya Coding School, Bhopal, Madhya Pradesh",
  ]

  return (
    <div>
      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() => {
            setVehiclePanel(true)
            setPanelOpen(false)
          }}
          className='flex items-center gap-4 my-2 rounded-xl border-2 border-gray-100 active:border-black p-3 cursor-pointer'
          role='button'
          tabIndex={0}
        >
          <div className='bg-[#eee] h-10 w-16 flex items-center justify-center rounded-full'>
            <FaMapMarkerAlt className='text-gray-700 text-md' />
          </div>
          <h4 className='font-medium'>{location}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
