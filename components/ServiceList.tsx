"use client";

import React, { useState } from 'react';

const services = [
  { name: "Haircut", price: 25 },
  { name: "Shave", price: 15 },
  { name: "Beard Trim", price: 20 },
  { name: "Hair Color", price: 50 },
];

const ServiceList = () => {
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: number }>({});

  const handleSelect = (serviceName: string, price: number) => {
    setSelectedServices(prev => {
      const newSelected = { ...prev };
      if (newSelected[serviceName]) {
        // Service already selected, so remove it
        delete newSelected[serviceName];
      } else {
        // Add service to selection
        newSelected[serviceName] = price;
      }
      return newSelected;
    });
  };

  const totalPrice = Object.values(selectedServices).reduce((acc, price) => acc + price, 0);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Services</h2>
      <ul className="space-y-4">
        {services.map(service => (
          <li
            key={service.name}
            className={`flex justify-between items-center p-4 rounded-lg border border-gray-300 hover:shadow-md transition-shadow ${
              selectedServices[service.name] ? 'bg-blue-100 border-blue-400' : 'bg-white'
            }`}
          >
            <div>
              <span className="text-lg font-semibold text-gray-800">{service.name}</span>
              <div className="text-sm text-gray-500">${service.price}</div>
            </div>
            <button
              onClick={() => handleSelect(service.name, service.price)}
              className={`ml-4 px-4 py-2 border rounded-md font-medium transition-colors ${
                selectedServices[service.name] ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 text-gray-700 border-gray-300'
              } hover:bg-blue-600 hover:border-blue-600`}
            >
              {selectedServices[service.name] ? 'Deselect' : 'Select'}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between text-xl font-semibold text-gray-800 border-t pt-4">
        <span>Total:</span>
        <span>${totalPrice}</span>
      </div>
    </div>
  );
};

export default ServiceList;
