"use client";

import React, { useState } from "react";
import { Grid, Typography, Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import DaySlider from "./DaySlider"; // Ensure this path is correct
import StyledSlot from "./AppointmentCalendar.styles"; // Ensure this path is correct

const services = [
  {
    name: "Haircut",
    duration: "45 minutes",
    description:
      "Consultation, shampooing, head massage, haircut, eyebrow refresh (if needed), nose & ear waxing (if needed), neck shaving, styling",
    price: "Huf5,500.00",
  },
  {
    name: "Beard Treatment",
    duration: "30 minutes",
    description:
      "Szakáll hossz igazítása ollóval és géppel, kontúrok borotválása",
    price: "Huf3,500.00",
  },
  {
    name: "Haircut & Beard Treatment",
    duration: "45 minutes",
    description: "Haircut services + Beard refresh & shaving the edges",
    price: "Huf8,000.00",
  },
  // Add other services similarly...
];

const slots: string[] = [];
for (let hour = 8; hour <= 21; hour++) {
  for (let minute = 0; minute <= 30; minute += 30) {
    slots.push(
      `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
    );
  }
}

const CombinedComponent = () => {
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: number }>({});
  const [showBooking, setShowBooking] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayjs().startOf("day"));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  const postData = async (data: any) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} ${response.statusText}`);
        console.error(`Error Details: ${errorText}`);
        throw new Error('Network response was not ok');
      }
  
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        return result;
      } else {
        const text = await response.text(); // Handle non-JSON responses
        console.log('Response is not JSON:', text);
        return {}; // Return an empty object or handle it as needed
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  

  const handleSelect = (serviceName: string, price: number) => {
    setSelectedServices((prev) => {
      const newSelected = { ...prev };
      if (newSelected[serviceName]) {
        delete newSelected[serviceName];
      } else {
        newSelected[serviceName] = price;
      }
      return newSelected;
    });
  };

  const totalPrice = Object.values(selectedServices).reduce((acc, price) => acc + price, 0);

  const isSlotBooked = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    return appointments.some((appt) =>
      dayjs(appt.appointmentDateTime).isSame(selectedDay.hour(hour).minute(minute), "minute")
    );
  };

  const isSlotInPast = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const slotDateTime = selectedDay.hour(hour).minute(minute);
    return slotDateTime.isBefore(dayjs());
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowDetails(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedTime && name && phone) {
      const appointmentData = {
        phoneNumber: phone,
        name: name,
        service: Object.keys(selectedServices).join(", "),
        localDate: selectedDay.format('YYYY-MM-DD'),
        hour: selectedTime,
      };

      try {
        const result = await postData(appointmentData);
        setConfirmationMessage(`Appointment booked successfully: ${JSON.stringify(result)}`);
        setName("");
        setPhone("");
        setSelectedDay(dayjs().startOf("day"));
        setSelectedTime(null);
        setShowDetails(false);
        setShowBooking(false);
      } catch (error) {
        setConfirmationMessage("Failed to book the appointment. Please try again.");
      }
    } else {
      setConfirmationMessage("Please fill out all fields and select a time slot.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      {!showBooking ? (
        <>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Services</h2>
          <ul className="space-y-4">
            {services.map((service) => (
              <li
                key={service.name}
                className={`flex justify-between items-center p-4 rounded-lg border border-gray-300 hover:shadow-md transition-shadow ${
                  selectedServices[service.name] ? "bg-blue-100 border-blue-400" : "bg-white"
                }`}
              >
                <div>
                  <span className="text-lg font-semibold text-gray-800">{service.name}</span>
                  <div className="text-sm text-gray-500">{service.duration}</div>
                  <div className="text-sm text-gray-500">{service.description}</div>
                  <div className="text-sm font-semibold mt-1">{service.price}</div>
                </div>
                <button
                  onClick={() => handleSelect(service.name, parseFloat(service.price.replace(/[^0-9.-]+/g, "")))}
                  className={`ml-4 px-4 py-2 border rounded-md font-medium transition-colors ${
                    selectedServices[service.name]
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-200 text-gray-700 border-gray-300"
                  } hover:bg-blue-600 hover:border-blue-600`}
                >
                  {selectedServices[service.name] ? "Deselect" : "Select"}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between text-xl font-semibold text-gray-800 border-t pt-4">
            <span>Total:</span>
            <span>Huf{totalPrice}</span>
          </div>
          <button
            onClick={() => setShowBooking(true)}
            className="mt-6 w-full p-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        </>
      ) : !showDetails ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Book an Appointment</h2>
          <DaySlider currentDay={selectedDay} setCurrentDay={setSelectedDay} />
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Choose a Time</h3>
            <Grid container spacing={2}>
              {slots.map((time) => (
                <Grid item xs={12} sm={6} lg={3} key={time}>
                  <StyledSlot
                    elevation={3}
                    isBooked={isSlotBooked(time)}
                    isSelected={selectedTime === time}
                  >
                    <Button
                      fullWidth
                      variant="text"
                      onClick={() => handleTimeSelect(time)}
                      disabled={isSlotBooked(time) || isSlotInPast(time)}
                    >
                      <Typography mr={1} variant="h6">
                        {time}
                      </Typography>
                      <Typography variant="body2">
                        {isSlotBooked(time)
                          ? "Booked"
                          : isSlotInPast(time)
                          ? "Past Slot"
                          : "Open Slot"}
                      </Typography>
                    </Button>
                  </StyledSlot>
                </Grid>
              ))}
            </Grid>
          </div>
          <button
            onClick={() => setShowBooking(false)}
            className="mt-6 w-full p-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600"
          >
            Back to Services
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter Your Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="mt-4 flex justify-between text-xl font-semibold text-gray-800 border-t pt-4">
              <span>Selected Time:</span>
              <span>{selectedTime}</span>
            </div>
            <div className="mt-4 flex justify-between text-xl font-semibold text-gray-800 border-t pt-4">
              <span>Total:</span>
              <span>Huf{totalPrice}</span>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-6"
            >
              Book Appointment
            </Button>
          </form>
          <button
            onClick={() => setShowDetails(false)}
            className="mt-6 w-full p-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600"
          >
            Back to Time Slots
          </button>
        </>
      )}
      {confirmationMessage && (
        <div
          className={`mt-6 p-4 rounded-md ${
            confirmationMessage.startsWith("Failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default CombinedComponent;
